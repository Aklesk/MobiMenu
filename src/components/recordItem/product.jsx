import React from 'react'

import RecordName from './editComponents/recordName'
import RecordPrice from './editComponents/productPrice'
import RecordDisplayPrice from './editComponents/productDisplayPrice'
import RecordDesc from './editComponents/recordDesc'
import RecordCategory from './editComponents/productCategory'
import RecordPLU from './editComponents/productPLU'

export default class RecordItemBodyProduct extends React.Component {
    render() {
        const { record } = this.props
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} />

                    <RecordPrice record={record} />

                    <div className="spacer" />

                    <RecordDisplayPrice record={record} />

                    <div className="spacer" />

                    <RecordDesc record={record} />

                    <div className="spacer" />

                    <RecordCategory record={record} />

                    <div className="spacer" />

                    <RecordPLU record={record} />

                    <div className="spacer" />
                </div>
            </div>
        )
    }
}