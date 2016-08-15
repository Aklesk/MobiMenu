import React from 'react'

// These MUST BE UNIQUE
const baseElement = "recordDesc"
const editElement = "recordDescEdit"

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
            rec.desc = document.getElementById(elem).value
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
                                record.desc
                                :
                                <span className="filler">No Description</span>
                            }
                        </div>
                }
            </div>
        )
    }
}


export default RecordName