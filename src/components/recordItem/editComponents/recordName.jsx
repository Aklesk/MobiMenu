import React from 'react'

// These MUST BE UNIQUE
const editElement = "recordNameEdit"

export default class RecordName extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            record.name = document.getElementById(elem).value
            return record
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className="recordName">
                {
                    editing().elem == editElement
                        ?
                        <input id={editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.name}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, editElement)}
                        >
                            <div className="labelText">
                                Public Name:
                            </div>
                            <div className="recordNameText">
                                {
                                    record.name.length > 0
                                        ?
                                        record.name
                                        :
                                        <span className="filler">-- PUBLIC NAME --</span>
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
}