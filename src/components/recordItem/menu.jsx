import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'
import MenuContents from './editComponents/menuContents.jsx'

class RecordItemBodyMenu extends React.Component {
    constructor() {super()}
    render() {
        const { record, recordDict } = this.props
        const { editing } = this.context
        return (
            <div>
                <div className="recordHours">
                    <div className="labelText">Hours Active:</div>
                    <div className="labelText">Days Active:</div>
                </div>

                <hr />

                <div className="recordBody">

                    <RecordName record={record} editing={editing} />

                    <RecordDesc record={record} editing={editing} />

                    <div className="spacer"/>

                    <MenuContents record={record} recordDict={recordDict} editing={editing} />

                </div>
            </div>
        )
    }
}

RecordItemBodyMenu.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyMenu