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
        this.context.editing(rec, elem, saveFunc, event)
    }
    render() {
        const { record } = this.props
        return(
            <div className="recordDesc">
                {
                    this.context.editing().elem == "recordDescEdit"
                        ?
                        <input id="recordDescEdit"
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.desc}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, "recordDescEdit")}
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

RecordName.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordName