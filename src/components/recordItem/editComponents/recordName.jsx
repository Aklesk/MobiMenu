import React from 'react'

// These MUST BE UNIQUE
const baseElement = "recordName"
const editElement = "recordNameEdit"

class RecordName extends React.Component {
    constructor() {
        super()
    }
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            const rec = record
            rec.name = document.getElementById(elem).value
            return rec
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className={baseElement}>
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

export default RecordName