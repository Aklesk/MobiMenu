import React from 'react'
import ShortID from 'shortid'
import _ from 'lodash'

// This is a category, which acts as a header for, and contains, products.
const CategoryGroup = function(props) {
    const items = props.products.map((prod) => {
        const product = props.recordDict[prod]
        return(
            <div className="recordProduct" key={ShortID.generate()}>
                {product.intName}
            </div>
        )
    })
    return(
        <div className="recordCategoryGroup">
            <div className="recordCategoryHeader">
                {props.category.intName}
            </div>
            {items}
        </div>
    )
}

class RecordName extends React.Component {
    constructor() {
        super()
    }
    listItems() {
        const categories = _.uniq(this.props.record.products.map(r => this.props.recordDict[this.props.recordDict[r].category].guid))
        return categories.map((key) => {
            const products = this.props.record.products.filter(p => this.props.recordDict[p].category == key)
            return (
                <CategoryGroup recordDict={this.props.recordDict}
                               products={products}
                               category={this.props.recordDict[key]}
                               key={ShortID.generate()}
                />
            )
        })
    }
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            return rec
        }
        this.context.changeEditState(rec, elem, saveFunc, event)
    }
    render() {
        const listItems = this.listItems()
        return(
            <div className="menuContents">
                {
                    this.context.editing.elem == "menuContentsEdit"
                        ?
                        <div>ListItems edited here.</div>
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, this.props.record.guid, "menuContentsEdit")}
                        >
                            <div className="labelText">
                                Menu Contents:
                            </div>
                            {
                                listItems.length > 0
                                ?
                                listItems
                                :
                                <span className="filler">No Contents</span>
                            }
                        </div>
                }
            </div>
        )
    }
}

RecordName.contextTypes = {
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func
}

export default RecordName