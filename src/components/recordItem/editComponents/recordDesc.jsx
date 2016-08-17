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
                    editing().elem == this.editElement
                        ?
                        <textarea id={this.editElement}
                                  style={{width: "400px"}}
                                  defaultValue={record.desc}
                                  onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
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