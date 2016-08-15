import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'

class RecordItemBodyCategory extends React.Component {
    constructor() {super()}
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

RecordItemBodyCategory.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyCategory