import React from 'react'

import RecordName from './editComponents/recordName'
import RecordDesc from './editComponents/recordDesc'
import MenuContents from './editComponents/menuContents'

export default class RecordItemBodyMenu extends React.Component {
    render() {
        const { record } = this.props
        const { editing } = this.context
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

                    <MenuContents record={record} />

                </div>
            </div>
        )
    }
}