import React from 'react'

// These MUST BE UNIQUE
const editElement = "recordPLUEdit"

export default class RecordPLU extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            record.plu = document.getElementById(elem).value
            return record
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className="recordPLU">
                {
                    editing().elem == editElement
                        ?
                        <input id={editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.plu}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, editElement)}
                        >
                            <div className="labelText">
                                PLU:
                            </div>
                            {
                                record.plu.length > 0
                                ?
                                record.plu
                                :
                                <span className="filler">No PLU specified</span>
                            }
                        </div>
                }
            </div>
        )
    }
}