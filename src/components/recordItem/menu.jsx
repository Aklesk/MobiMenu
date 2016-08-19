import React from 'react'

import RecordName from './editComponents/recordName'
import RecordDesc from './editComponents/recordDesc'
import MenuContents from './editComponents/menuContents'
import MenuTimes from './editComponents/menuTimes'

export default class RecordItemBodyMenu extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    }
    render() {
        const { record } = this.props
        return (
            <div>
                <MenuTimes />

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