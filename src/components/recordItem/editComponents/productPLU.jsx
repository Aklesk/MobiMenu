import React from 'react'
import ShortID from 'shortid'

export default class RecordPLU extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    editElement = ShortID.generate()
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
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.plu}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
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