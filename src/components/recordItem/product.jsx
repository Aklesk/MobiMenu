import React from 'react'

import RecordName from './editComponents/recordName'
import RecordPrice from './editComponents/productPrice'
import RecordDisplayPrice from './editComponents/productDisplayPrice'
import RecordDesc from './editComponents/recordDesc'
import RecordCategory from './editComponents/productCategory'
import RecordPLU from './editComponents/productPLU'

export default class RecordItemBodyProduct extends React.Component {
    static contextTypes = {
        editing: React.PropTypes.func
    }
    render() {
        const { record, recordDict } = this.props
        const { editing } = this.context
        const category = recordDict[record.category]
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} editing={editing}  />

                    <RecordPrice record={record} editing={editing} />

                    <div className="spacer" />

                    <RecordDisplayPrice record={record} editing={editing} />

                    <div className="spacer" />

                    <RecordDesc record={record} editing={editing} />

                    <div className="spacer" />

                    <RecordCategory record={record} editing={editing} />

                    <div className="spacer" />

                    <RecordPLU record={record} editing={editing} />

                    <div className="spacer" />
                </div>
            </div>
        )
    }
}