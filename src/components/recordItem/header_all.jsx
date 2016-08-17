import React from 'react'
import { browserHistory } from 'react-router'
import { mainTabs } from 'interfaceConstants'

import RecordTitle from './editComponents/recordTitle'

export default class RecordItemHeader extends React.Component {
    static contextTypes = {
        deleteRecord: React.PropTypes.func,
        editing: React.PropTypes.func,
        overlay: React.PropTypes.func
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