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
        this.context.changeEditState(rec, elem, saveFunc, event)
    }
    render() {
        return(
            <div className="recordName">
                {
                    this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "recordNameEdit"
                        ?
                        <input id="recordNameEdit"
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={this.props.record.name}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, this.props.record.guid, "recordNameEdit")}
                        >
                            <div className="labelText">
                                Public Name:
                            </div>
                            <div className="recordNameText">
                                {
                                    this.props.record.name.length > 0
                                        ?
                                        this.props.record.name
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
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func
}

export default RecordName