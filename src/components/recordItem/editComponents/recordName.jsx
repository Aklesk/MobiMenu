import React from 'react'

class RecordName extends React.Component {
    constructor() {
        super()
    }
    componentDidUpdate() {
        if (document.getElementById("recordNameEdit") != null) {
            document.getElementById("recordNameEdit").focus()
        }
    }
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            rec.name = document.getElementById(elem).value
            return rec
        }
        this.context.editing(rec, elem, saveFunc, event)
    }
    render() {
        const { record } = this.props
        return(
            <div className="recordName">
                {
                    this.context.editing().elem == "recordNameEdit"
                        ?
                        <input id="recordNameEdit"
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.name}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, "recordNameEdit")}
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

RecordName.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordName