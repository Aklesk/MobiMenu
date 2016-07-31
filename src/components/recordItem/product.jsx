import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'

class RecordItemBodyProduct extends React.Component {
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
        const category = this.props.recordDict[this.props.record.category]
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={this.props.record} />

                    <div className="labelText">
                        Price:
                    </div>
                    <div className="recordPrice">
                        {this.props.record.price}
                    </div>

                    <div className="spacer" />

                    <RecordDesc record={this.props.record} />

                    <div className="spacer" />

                    <div className="labelText">
                        Product Category:
                    </div>
                    <div className="recordCategory">
                        {category.name}
                    </div>
                </div>
            </div>
        );
    }
}

RecordItemBodyProduct.contextTypes = {
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func
}

export default RecordItemBodyProduct