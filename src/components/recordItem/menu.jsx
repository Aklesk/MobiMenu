import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'
import MenuContents from './editComponents/menuContents.jsx'

class RecordItemBodyMenu extends React.Component {
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
        return (
            <div>
                <div className="recordHours">
                    <div className="labelText">Hours Active:</div>
                    <div className="labelText">Days Active:</div>
                </div>

                <hr />

                <div className="recordBody">

                    <RecordName record={record} />

                    <RecordDesc record={record} />

                    <div className="spacer"/>

                    <MenuContents record={record} recordDict={recordDict}/>

                </div>
            </div>
        )
    }
}

RecordItemBodyMenu.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyMenu