import React from 'react'
import ShortID from 'shortid'

export default class RecordTitle extends React.Component {
    componentDidMount() {

        // We need this as well because we want to edit this immediately after it is created in the case of
        // a new record creation event that also drops us into editing mode.

        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    componentDidUpdate() {
        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    editElement = ShortID.generate()
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            record.intName = document.getElementById(elem).value
            return record
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div>
                {
                    editing().elem == this.editElement
                        ?
                        <div className="leftPart">
                            <input id={this.editElement}
                                   type="text"
                                   style={{width: "326px"}}
                                   defaultValue={record.intName}
                                   onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        :
                        <div className="leftPart editable"
                             onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                Internal Name:
                            </div>
                            <div className="headerText">
                                {
                                    record.intName.length > 0
                                    ?
                                    record.intName
                                    :
                                    <span className="filler">-- Internal Name --</span>
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
}