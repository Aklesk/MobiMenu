import React from 'react'
import { findDOMNode } from 'react-dom'
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from 'interfaceConstants'
import { Product, DraggableProduct } from './product'

// =======================================================================
// This section contains data and functions needed for dragging to occur with React-DnD.
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

        // Time to actually perform the action
        component.props.updateList(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations, but it's good here for the sake of performance
        // to avoid expensive index searches, and this allows us to not have to look the index up from the ID.
        monitor.getItem().index = hoverIndex
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

export class CategoryGroup extends React.Component {
    static contextTypes = {
        updateList: React.PropTypes.func
    }
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
        const { category, editing, editElement, isDragging, products, record, recordDict} = this.props

        // If we call this component without its wrapper, we need the return function to still work.
        const connectDropTarget = (this.props.connectDropTarget || ((a) => {return a}))
        const connectDragSource = (this.props.connectDragSource || ((a) => {return a}))

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
                                                  editElement={editElement}
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
                                         editing={editing}
                                         editElement={editElement}
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

export const DraggableCategoryGroup =
    DropTarget(dragTypes.categoryListing, drop, collectTarget)(
        DragSource(dragTypes.categoryListing, drag, collectSource)(CategoryGroup)
    )