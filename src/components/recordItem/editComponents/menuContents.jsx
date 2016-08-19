import React from 'react'
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from 'interfaceConstants'
import ShortID from 'shortid'

import { CategoryGroup, DraggableCategoryGroup } from './menuContents/categoryGroup'

export default class menuContents extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    }
    static contextTypes = {
        dataObj: React.PropTypes.object,
        dragging: React.PropTypes.func,
        editing: React.PropTypes.func,
        overlay: React.PropTypes.func,
        recordDict: React.PropTypes.object,
        updateList: React.PropTypes.func
    }
    addProduct = (event) => {

        // This is called when the user selects "Add New" during editing of the category groups, and allows new
        // products to be added to the menu.

        const { record } = this.props
        const { dataObj, overlay, recordDict, updateList } = this.context
        event.stopPropagation()
        const validProducts = dataObj.products.filter((rec) => {
            return (record.products.find((id) => {return id == rec.guid}) == undefined)
        })
        overlay(
            "Add Product",
            validProducts,
            "addProduct",
            (guid) => {
                record.products.push(guid)
                updateList(record)
            }
        )
    }
    editElement = ShortID.generate()
    onClick = (rec, elem, event) => {
        const { record } = this.props
        const { editing } = this.context
        editing(rec, elem, () => {return record}, event)
    }
    updateList = (source, dest) => {

        // This function is used to update the order of the category groups during a click-and-drag event.

        const { record } = this.props
        const { updateList, recordDict } = this.context

        // To start, get the list of categories in displayed order as GUIDs
        const categories = _.compact(_.uniq(record.products.map((r) => {
            if (recordDict[r] != undefined) {return (recordDict[r].category)}
        })))

        // Now re-order the categories list as per the source and dest
        categories.splice(dest, 0, categories.splice(source, 1)[0])

        // Now convert the list of categories to an ordered list of records to be saved
        const newList = []
        categories.forEach((k) => {
            const products = record.products.filter(p => recordDict[p] && recordDict[p].category == k)
            products.forEach(k => newList.push(k))
        })

        // And finally, save it.
        record.products = newList
        updateList(record)
    }
    render() {
        const { record } = this.props
        const { editing, recordDict } = this.context
        const categories = _.compact(_.uniq(record.products.map((r) => {
            if (recordDict[r] != undefined) {return (recordDict[r].category)}
        })))
        return(
            <div className="menuContents">
                {
                    editing().elem == this.editElement
                    ?
                    <div className="editBlock">
                        {
                            record.products.length > 0
                            ?
                            <div>
                                {
                                    categories.map((key, i) => {
                                        return (
                                            <DraggableCategoryGroup category={key}
                                                                    editElement={this.editElement}
                                                                    index={i}
                                                                    id={`${record.guid}category${i}`}
                                                                    key={key}
                                                                    record={record}
                                                                    updateList={this.updateList}
                                            />
                                        )
                                    })
                                }
                            </div>
                            :
                            <span className="filler">No Contents</span>
                        }
                        <div style={{textAlign: "right"}}>
                            <button style={{display: "inline-block"}}
                                    onClick={this.addProduct}
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                    :
                    <div
                        className="editable"
                        onClick={this.onClick.bind(this, record.guid, this.editElement)}
                    >
                        <div className="labelText">
                            Menu Contents:
                        </div>
                        {
                            record.products.length > 0
                            ?
                            <div>
                                {
                                    categories.map((key) => {
                                        return (
                                            <CategoryGroup category={key}
                                                           editElement={this.editElement}
                                                           key={key}
                                                           record={record}
                                                           updateList={this.updateList}
                                            />
                                        )
                                    })
                                }
                            </div>
                            :
                            <span className="filler">No Contents</span>
                        }
                    </div>
                }
            </div>
        )
    }
}