import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'

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
        this.context.editing(rec, elem, saveFunc, event)
    }
    render() {
        const { record } = this.props
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} />

                    <RecordDesc record={record} />

                </div>
            </div>
        )
    }
}

RecordItemBodyCategory.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyCategory