import React from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from '../../../interfaceConstants'

// These MUST BE UNIQUE
const baseElement = "menuContents"
const editElement = "menuContentsEdit"








// =======================================================================
// This is a category react component, which acts as a header for, and contains, products.
// This category react component is only used here, by the menuContents component at the end of this file.
// It is also wrapped by the React-DnD functionality described in the code block labelled as handling dragging.
// =======================================================================
class CategoryGroup extends React.Component {
    updateList = (source, dest) => {

        // This function is used to update the order of the lists during a click-and-drag event.

        const { category, record, recordDict } = this.props

        // To start, get the list of categories in displayed order as GUIDs
        const categories = _.compact(_.uniq(record.products.map((r) => {
            if (recordDict[r] != undefined) {return (recordDict[r].category)}
        })))

        // Now convert the list of categories to an ordered list of records to be saved
        const newList = []
        categories.forEach((k) => {
            const products = record.products.filter(p => recordDict[p] && recordDict[p].category == k)

            // When we get to this category, re-order it before pushing it.
            if(k == category) {
                products.splice(dest, 0, products.splice(source, 1)[0])
            }

            products.forEach(k => newList.push(k))
        })

        // And finally, save it.
        record.products = newList
        this.context.updateList(record)
    }
    render() {
        const {category, connectDragSource, connectDropTarget, editing, isDragging, products, record, recordDict} = this.props
        return connectDropTarget(connectDragSource(
            <div className={`recordCategoryGroup ${isDragging ? "dragsource" : ""}`}>
                <div className="recordCategoryHeader">
                    {
                        editing().elem == editElement
                            ?
                            <div className="draggable">
                                <span className="filler">⇕ </span>
                                {
                                    recordDict[category] != undefined
                                    ?
                                    <span>{recordDict[category].intName}</span>
                                    :
                                    <span className="filler">-- No Category --</span>
                                }
                            </div>
                            :
                            <div>
                                {
                                    recordDict[category] != undefined
                                    ?
                                    <span>{recordDict[category].intName}</span>
                                    :
                                    <span className="filler">-- No Category --</span>
                                }
                            </div>
                    }
                </div>
                {
                    editing().elem == editElement
                        ?
                        products.map((prod, i) => {
                            return (
                                <DraggableProduct category={category}
                                                  editing={editing}
                                                  index={i}
                                                  id={`${recordDict[prod].guid}product${i}`}
                                                  key={recordDict[prod].guid}
                                                  product={recordDict[prod]}
                                                  record={record}
                                                  updateList={this.updateList}
                                />
                            )
                        })
                        :
                        products.map((prod, i) => {
                            return (
                                <Product category={category}
                                         connectDragSource={a => a}
                                         connectDropTarget={a => a}
                                         editing={editing}
                                         index={i}
                                         id={`${recordDict[prod].guid}product${i}`}
                                         key={recordDict[prod].guid}
                                         product={recordDict[prod]}
                                         record={record}
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
// This category react component is only used here, by the menuContents component at the end of this file.
// It is also wrapped by the React-DnD functionality described in the code block labelled as handling dragging.
// =======================================================================
function Product(props, context) {
    const { connectDragSource, connectDropTarget, editing, isDragging, product, record } = props
    function removeProduct(event) {
        event.stopPropagation()
        record.products.splice(record.products.indexOf(product.guid), 1)
        context.updateList(record)
    }
    return connectDropTarget(connectDragSource(
        <div className={`recordProduct ${isDragging ? "dragsource" : ""}`}>
            {
                editing().elem == editElement
                    ?
                    <div className="draggable">
                        <span className="filler">⇕ </span>
                        <span>{product.intName}</span>
                        <span className="fa fa-minus-square removeButton"
                              onClick={removeProduct}
                        />
                    </div>
                    :
                    <div>
                        {product.intName}
                    </div>
            }
        </div>
    ))
}

Product.contextTypes = {
    updateList: React.PropTypes.func
}








// =======================================================================
// This section contains data and functions needed for dragging to occur with React-DnD.
// The wrappers for the draggable react components in this section are defined in this block as well.
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
// This is the actual menu contents react component, which is the only exportable from this file.
// Everything above this point is purely support for this react component; none of the above is used,
// or can be used, elsewhere.
// =======================================================================
class menuContents extends React.Component {
    constructor() {
        super()

        this.state = {
            dragging: ""
        }
    }
    addProduct = (event) => {

        // This is called when the user selects "Add New" during editing of the category groups, and allows new
        // products to be added to the menu.

        const { record, recordDict } = this.props
        const { dataObj, overlay, updateList } = this.context
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
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        editing(rec, elem, () => {return record}, event)
    }
    updateList = (source, dest) => {

        // This function is used to update the order of the category groups during a click-and-drag event.

        const { record, recordDict } = this.props
        const { updateList } = this.context

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
        const { editing, record, recordDict } = this.props
        const categories = _.compact(_.uniq(record.products.map((r) => {
            if (recordDict[r] != undefined) {return (recordDict[r].category)}
        })))
        return(
            <div className={baseElement}>
                {
                    editing().elem == editElement
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
                                                                    editing={editing}
                                                                    index={i}
                                                                    id={`${record.guid}category${i}`}
                                                                    key={key}
                                                                    products={record.products.filter(p => recordDict[p] && recordDict[p].category == key)}
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
                        onClick={this.onClick.bind(this, record.guid, editElement)}
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
                                                           connectDragSource={a => a}
                                                           connectDropTarget={a => a}
                                                           editing={editing}
                                                           key={key}
                                                           products={record.products.filter(p => recordDict[p] && recordDict[p].category == key)}
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
    dataObj: React.PropTypes.object,
    dragging: React.PropTypes.func,
    overlay: React.PropTypes.func,
    updateList: React.PropTypes.func
}

export default menuContents