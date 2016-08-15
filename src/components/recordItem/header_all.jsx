import React from 'react'
import { browserHistory } from 'react-router'
import { mainTabs } from '../../interfaceConstants.js'

import RecordTitle from './editComponents/recordTitle.jsx'

class RecordItemHeader extends React.Component {
    constructor() {
        super()
    }
    deleteRecord(event) {
        const { record, section } = this.props
        const okayFunc = () => {
            this.context.deleteRecord(record.guid)
            browserHistory.push(`/menu/${section}`)
        }
        this.context.overlay(
            "Are you sure?",
            `Deleting this ${mainTabs[section].singular.toLowerCase()} is permanent and cannot be undone.`,
            "question",
            okayFunc
        )
    }
    render() {
        const { record, section } = this.props
        const { editing } = this.context
        return (
            <div>
                <div className="recordHeader">
                    <table className="nostyle">
                        <tbody>
                        <tr>
                            <td>
                                <RecordTitle record={record} editing={editing} />
                            </td>
                            <td>
                                <div className="rightPart">
                                    <a className="toDelete" onClick={this.deleteRecord.bind(this)}>
                                        {`Delete ${mainTabs[section].singular}`}
                                    </a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
            </div>
        )
    }
}

RecordItemHeader.contextTypes = {
    deleteRecord: React.PropTypes.func,
    editing: React.PropTypes.func,
    overlay: React.PropTypes.func
}

export default RecordItemHeader