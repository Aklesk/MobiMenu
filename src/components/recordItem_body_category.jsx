import React from 'react';
import Input from './input.jsx'
import Textarea from './textarea.jsx'

class RecordItemBodyCategory extends React.Component {
    constructor() {super()}
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            if(elem == "recordDescEdit") {
                rec.desc = document.getElementById(elem).value
            }
            if(elem == "recordNameEdit") {
                rec.name = document.getElementById(elem).value
            }
            return rec
        }
        this.context.changeEditState(rec, elem, saveFunc, event)
    }
    render() {
        return (
            <div>
                <div className="recordBody">






                    <div className="recordName">
                        {
                            this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "recordNameEdit"
                                ?
                                <Input
                                    elem="recordNameEdit"
                                    width="400px"
                                    defaultVal={this.props.record.name}
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






                    <div className="recordDesc">
                        {
                            this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "recordDescEdit"
                                ?
                                <Textarea
                                    elem="recordDescEdit"
                                    width="400px"
                                    defaultVal={this.props.record.desc}
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



                </div>
            </div>
        )
    }
}

RecordItemBodyCategory.contextTypes = {
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func
}

export default RecordItemBodyCategory