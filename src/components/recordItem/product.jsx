import React from 'react'

import RecordName from './editComponents/recordName.jsx'
import RecordDesc from './editComponents/recordDesc.jsx'

class RecordItemBodyProduct extends React.Component {
    constructor() {super()}
    render() {
        const { record, recordDict } = this.props
        const { editing } = this.context
        const category = recordDict[record.category]
        return (
            <div>
                <div className="recordBody">

                    <RecordName record={record} editing={editing} />

                    <div className="labelText">
                        Price:
                    </div>
                    <div className="recordPrice">
                        {record.price}
                    </div>

                    <div className="spacer" />

                    <RecordDesc record={record} editing={editing} />

                    <div className="spacer" />

                    <div className="labelText">
                        Product Category:
                    </div>
                    <div className="recordCategory">
                        {
                            category != undefined
                            ?
                            category.name
                            :
                            <span className="filler"> -- No Category -- </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

RecordItemBodyProduct.contextTypes = {
    editing: React.PropTypes.func
}

export default RecordItemBodyProduct