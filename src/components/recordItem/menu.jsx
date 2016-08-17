import React from 'react'

import RecordName from './editComponents/recordName'
import RecordDesc from './editComponents/recordDesc'
import MenuContents from './editComponents/menuContents'

export default class RecordItemBodyMenu extends React.Component {
    static contextTypes = {
        editing: React.PropTypes.func
    }
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