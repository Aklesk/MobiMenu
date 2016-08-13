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
        this.context.editing(rec, elem, saveFunc, event)
    }
    render() {
        const { record, recordDict } = this.props
        const category = recordDict[record.category]
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} />

                    <div className="labelText">
                        Price:
                    </div>
                    <div className="recordPrice">
                        {record.price}
                    </div>

                    <div className="spacer" />

                    <RecordDesc record={record} />

                    <div className="spacer" />

                    <div className="labelText">
                        Product Category:
                    </div>
                    <div className="recordCategory">
                        {
                            category != undefined
                            ?
                            category.name
                            :
                            <span className="filler"> -- No Category -- </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

RecordItemBodyProduct.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyProduct