import React from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from 'interfaceConstants'

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

        // We need to check to make sure that we stay within scope (we shouldn't be able to drag between categories).
        if (component.currentType == "categoryProduct" && monitor.getItem().category != component.props.category) {
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

export class Product extends React.Component {
    static propTypes = {
        connectDragSource: React.PropTypes.func,
        connectDropTarget: React.PropTypes.func,
        editElement: React.PropTypes.string.isRequired,
        id: React.PropTypes.string, // Needed if calling Draggable
        index: React.PropTypes.number, // Needed if calling Draggable
        product: React.PropTypes.object.isRequired,
        record: React.PropTypes.object.isRequired
    }
    static defaultProps = {
        connectDragSource: (a) => {return a},
        connectDropTarget: (a) => {return a}
    }
    static contextTypes = {
        editing: React.PropTypes.func,
        updateList: React.PropTypes.func
    }
    removeProduct = (event) => {
        const { product, record } = this.props
        const { updateList } = this.context
        event.stopPropagation()
        record.products.splice(record.products.indexOf(product.guid), 1)
        updateList(record)
    }
    render() {
        const { connectDragSource, connectDropTarget, editElement, isDragging, product, record } = this.props
        const { editing } = this.context
        return connectDropTarget(connectDragSource(
            <div className={`recordProduct ${isDragging ? "dragsource" : ""}`}>
                {
                    editing().elem == editElement
                        ?
                        <div className="draggable">
                            <span className="filler">⇕ </span>
                            <span>{product.intName}</span>
                            <span className="fa fa-minus-square removeButton"
                                  onClick={this.removeProduct}
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
}

export const DraggableProduct =
    DropTarget(dragTypes.categoryProduct, drop, collectTarget)(
        DragSource(dragTypes.categoryProduct, drag, collectSource)(Product)
    )