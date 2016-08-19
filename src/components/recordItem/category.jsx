import React from 'react'

import RecordName from './editComponents/recordName'
import RecordDesc from './editComponents/recordDesc'

export default class RecordItemBodyCategory extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
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