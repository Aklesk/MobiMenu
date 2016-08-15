import React from 'react'

// These MUST BE UNIQUE
const baseElement = "leftPart"
const editElement = "intNameEdit"

class RecordTitle extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {

        // We need this as well because we want to edit this immediately after it is created in the case of
        // a new record creation event that also drops us into editing mode.

        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
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
                    editing().elem == editElement
                        ?
                        <div className={baseElement}>
                            <input id="intNameEdit"
                                   type="text"
                                   style={{width: "326px"}}
                                   defaultValue={record.intName}
                                   onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        :
                        <div className={`${baseElement} editable`}
                             onClick={this.onClick.bind(this, record.guid, "intNameEdit")}
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

export default RecordTitle