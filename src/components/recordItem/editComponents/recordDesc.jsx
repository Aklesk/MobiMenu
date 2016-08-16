import React from 'react'

// These MUST BE UNIQUE
const editElement = "recordDescEdit"

export default class RecordName extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            record.desc = document.getElementById(elem).value
            return record
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className="recordDesc">
                {
                    editing().elem == editElement
                        ?
                        <textarea id={editElement}
                                  style={{width: "400px"}}
                                  defaultValue={record.desc}
                                  onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, editElement)}
                        >
                            <div className="labelText">
                                Menu Description:
                            </div>
                            {
                                record.desc.length > 0
                                ?
                                <div className="textBlock">
                                    {record.desc}
                                </div>
                                :
                                <span className="filler">No Description</span>
                            }
                        </div>
                }
            </div>
        )
    }
}