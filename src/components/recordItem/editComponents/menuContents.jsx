import React from 'react'
import { findDOMNode } from 'react-dom'
import ShortID from 'shortid'
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd'
import { dragTypes } from '../../../interfaceConstants'

// =======================================================================
// This is a category react component, which acts as a header for, and contains, products.
// This category react component is only used here, by the menuContents component.
// =======================================================================
function CategoryGroup(props, context) {
    const { category, connectDragSource, connectDropTarget, products, recordDict } = props
    return connectDragSource(connectDropTarget(
        <div className="recordCategoryGroup">
            <div className="recordCategoryHeader">
                {category.intName}
            </div>
            {
                products.map((prod) => {
                    return (
                        <div className="recordProduct" key={ShortID.generate()}>
                            {
                                context.editing().elem == "menuContentsEdit"
                                    ?
                                    <div>
                                        {recordDict[prod].intName}
                                    </div>
                                    :
                                    <div>
                                        {recordDict[prod].intName}
                                    </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    ))
}

CategoryGroup.contextTypes = {
    editing: React.PropTypes.func,
}



// =======================================================================
// This allows a category group to be draggable
// =======================================================================
const drag = {
    beginDrag(props) {
        const item = { id: props.id, index: props.index }
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
        console.log(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
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
                                                                        index={i}
                                                                        id={`${record.guid}category${i}`}
                                                                        key={ShortID.generate()}
                                                                        products={record.products.filter(p => recordDict[p].category == key)}
                                                                        recordDict={recordDict}
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
                                                               key={ShortID.generate()}
                                                               products={record.products.filter(p => recordDict[p].category == key)}
                                                               recordDict={recordDict}
                                                               connectDragSource={a => a}
                                                               connectDropTarget={a => a}
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