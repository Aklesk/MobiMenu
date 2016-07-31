import React from 'react'

class RecordName extends React.Component {
    constructor() {
        super()
    }
    componentDidUpdate() {
        if (document.getElementById("recordDescEdit") != null) {
            document.getElementById("recordDescEdit").focus()
        }
    }
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            rec.desc = document.getElementById(elem).value
            return rec
        }
        this.context.changeEditState(rec, elem, saveFunc, event)
    }
    render() {
        return(
            <div className="recordDesc">
                {
                    this.context.editing.elem == "recordDescEdit"
                        ?
                        <input id="recordDescEdit"
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={this.props.record.desc}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, this.props.record.guid, "recordDescEdit")}
                        >
                            <div className="labelText">
                                Menu Description:
                            </div>
                            {
                                this.props.record.desc.length > 0
                                    ?
                                    this.props.record.desc
                                    :
                                    <span className="filler">No Description</span>
                            }
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