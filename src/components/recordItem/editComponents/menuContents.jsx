import React from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from '../../../interfaceConstants'

// =======================================================================
// This is a category react component, which acts as a header for, and contains, products.
// This category react component is only used here, by the menuContents component.
// =======================================================================
class CategoryGroup extends React.Component {
    updateList = (source, dest) => {
        const { category, record, recordDict } = this.props

        // To start, get the list of categories in displayed order as GUIDs
        const categories = _.uniq(record.products.map(r => recordDict[recordDict[r].category].guid))

        // Now convert the list of categories to an ordered list of records to be saved
        const newList = []
        categories.forEach((k) => {
            const products = record.products.filter(p => recordDict[p].category == k)

            // When we get to this category, re-order it before pushing it.
            if(k == category.guid) {
                products.splice(dest, 0, products.splice(source, 1)[0])
            }

            products.forEach(k => newList.push(k))
        })

        // And finally, save it.
        record.products = newList
        this.context.updateList(record)
    }
    render() {
        const {category, connectDragSource, connectDropTarget, editing, isDragging, products, recordDict} = this.props
        return connectDropTarget(connectDragSource(
            <div className={`recordCategoryGroup ${isDragging ? "dragsource" : ""}`}>
                <div className="recordCategoryHeader">
                    {
                        editing().elem == "menuContentsEdit"
                            ?
                            <div className="draggable">
                                <span className="filler">⇕ </span>
                                <span>{category.intName}</span>
                            </div>
                            :
                            <div>
                                {category.intName}
                            </div>
                    }
                </div>
                {
                    editing().elem == "menuContentsEdit"
                        ?
                        products.map((prod, i) => {
                            return (
                                <DraggableProduct category={category.guid}
                                                  editing={editing}
                                                  index={i}
                                                  id={`${recordDict[prod].guid}product${i}`}
                                                  key={recordDict[prod].guid}
                                                  record={recordDict[prod]}
                                                  updateList={this.updateList}
                                />
                            )
                        })
                        :
                        products.map((prod, i) => {
                            return (
                                <Product category={category.guid}
                                         connectDragSource={a => a}
                                         connectDropTarget={a => a}
                                         editing={editing}
                                         index={i}
                                         id={`${recordDict[prod].guid}product${i}`}
                                         key={recordDict[prod].guid}
                                         record={recordDict[prod]}
                                         updateList={this.updateList}
                                />
                            )
                        })

                }
            </div>
        ))
    }
}


CategoryGroup.contextTypes = {
    updateList: React.PropTypes.func
}


// =======================================================================
// This is a product react component, which acts as a component for products.
// This category react component is only used here, by the menuContents component.
// =======================================================================
function Product(props, context) {
    const { connectDragSource, connectDropTarget, editing, isDragging, record } = props
    return connectDropTarget(connectDragSource(
        <div className={`recordProduct ${isDragging ? "dragsource" : ""}`}>
            {
                editing().elem == "menuContentsEdit"
                    ?
                    <div>
                        <span className="filler">⇕ </span>
                        <span>{record.intName}</span>
                    </div>
                    :
                    <div>
                        {record.intName}
                    </div>
            }
        </div>
    ))
}



// =======================================================================
// This allows a category group to be draggable
// =======================================================================
const drag = {
    beginDrag(props) {
        const item = { id: props.id, index: props.index, category: props.category }
        return item
    }
}


const drop = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // If we're dragging a product (rather than a category), we need to check to make sure that we stay
        // within scope (we shouldn't be able to drag between categories).
        if (component.currentType == "categoryProduct" && monitor.getItem().category != component.props.category) {
            return
        }

        // Time to actually perform the action
        component.props.updateList(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations, but it's good here for the sake of performance
        // to avoid expensive index searches, and this allows us to not have to look the index up from the ID.
        monitor.getItem().index = hoverIndex;
    }
}


function collectTarget(connect) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}


function collectSource(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    }
}


const DraggableCategoryGroup =
    DropTarget(dragTypes.categoryListing, drop, collectTarget)(
        DragSource(dragTypes.categoryListing, drag, collectSource)(CategoryGroup)
    )

const DraggableProduct =
    DropTarget(dragTypes.categoryProduct, drop, collectTarget)(
        DragSource(dragTypes.categoryProduct, drag, collectSource)(Product)
    )


// =======================================================================
// This is the actual menu contents react component
// =======================================================================
class menuContents extends React.Component {
    constructor() {
        super()

        this.state = {
            dragging: ""
        }
    }
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            return rec
        }
        this.context.editing(rec, elem, saveFunc, event)
    }
    updateList = (source, dest) => {
        const { record, recordDict } = this.props

        // To start, get the list of categories in displayed order as GUIDs
        const categories = _.uniq(record.products.map(r => recordDict[recordDict[r].category].guid))

        // Now re-order the categories list as per the source and dest
        categories.splice(dest, 0, categories.splice(source, 1)[0])

        // Now convert the list of categories to an ordered list of records to be saved
        const newList = []
        categories.forEach((k) => {
            const products = record.products.filter(p => recordDict[p].category == k)
            products.forEach(k => newList.push(k))
        })

        // And finally, save it.
        record.products = newList
        this.context.updateList(record)
    }
    render() {
        const { record, recordDict } = this.props
        const categories = _.uniq(record.products.map(r => recordDict[recordDict[r].category].guid))
        return(
            <div className="menuContents">
                {
                    this.context.editing().elem == "menuContentsEdit"
                        ?
                        <div className="editBlock">
                            {
                                record.products.length > 0
                                ?
                                <div>
                                    {
                                        categories.map((key, i) => {
                                            return (
                                                <DraggableCategoryGroup category={recordDict[key]}
                                                                        editing={this.context.editing}
                                                                        index={i}
                                                                        id={`${record.guid}category${i}`}
                                                                        key={key}
                                                                        products={record.products.filter(p => recordDict[p].category == key)}
                                                                        record={record}
                                                                        recordDict={recordDict}
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
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, "menuContentsEdit")}
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
                                                <CategoryGroup category={recordDict[key]}
                                                               connectDragSource={a => a}
                                                               connectDropTarget={a => a}
                                                               editing={this.context.editing}
                                                               key={key}
                                                               products={record.products.filter(p => recordDict[p].category == key)}
                                                               record={record}
                                                               recordDict={recordDict}
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

menuContents.contextTypes = {
    dragging: React.PropTypes.func,
    editing: React.PropTypes.func,
    updateList: React.PropTypes.func
}

export default menuContents