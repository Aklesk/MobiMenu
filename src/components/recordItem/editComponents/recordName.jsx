import React from 'react'
import ShortID from 'shortid'

export default class RecordName extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    editElement = ShortID.generate()
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
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.name}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
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