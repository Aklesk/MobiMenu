import React from 'react'
import { browserHistory } from 'react-router'
import { mainTabs } from '../../interfaceConstants.js'

// We're using componentWillUpdate and componentWillMount to get the record data out of the database to try to
// minimize the number of database calls.

class RecordItemHeader extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        if (document.getElementById("intNameEdit") != null) {
            document.getElementById("intNameEdit").focus()
        }
    }
    componentDidUpdate() {
        if (document.getElementById("intNameEdit") != null) {
            document.getElementById("intNameEdit").focus()
        }
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
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            rec.intName = document.getElementById(elem).value
            return rec
        }
        this.context.editing(rec, elem, saveFunc, event)
    }
    render() {
        const { record, section } = this.props
        return (
            <div>
                <div className="recordHeader">
                    <table className="nostyle">
                        <tbody>
                        <tr>
                            <td>
                                {
                                    this.context.editing().elem == "intNameEdit"
                                    ?
                                    <div className="leftPart">
                                        <input id="intNameEdit"
                                               type="text"
                                               style={{width: "326px"}}
                                               defaultValue={record.intName}
                                               onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    :
                                    <div className="leftPart editable"
                                             onClick={this.onClick.bind(this, record.guid, "intNameEdit")}
                                        >
                                        <div className="labelText">
                                            Internal Name:
                                        </div>
                                        <div className="headerText">
                                            {
                                                record.intName.length > 0
                                                ?
                                                record.intName
                                                :
                                                <span className="filler">-- Internal Name --</span>
                                            }
                                        </div>
                                    </div>
                                }
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