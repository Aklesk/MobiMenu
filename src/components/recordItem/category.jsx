import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'

export default class RecordItemBodyCategory extends React.Component {
    static contextTypes = {
        editing: React.PropTypes.func
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} editing={editing} />

                    <RecordDesc record={record} editing={editing} />

                </div>
            </div>
        )
    }
}