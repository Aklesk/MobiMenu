import React from 'react';

// We're using componentWillUpdate and componentWillMount to get the record data out of the database to try to
// minimize the number of database calls.

class RecordItemHeader extends React.Component {
    constructor() {super()}
    isEditing() {
        if (this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "header") {
            return (
                <input type="text" defaultValue={this.props.record.intName} />
            )
        }
        else {
            return (
                <div className="headerText" onClick={this.onClick.bind(this, this.props.record.guid, "header")}>{this.props.record.intName}</div>
            )
        }
    }
    onClick = function(rec, elem) {
        this.context.changeEditState(rec, elem)
    }
    render() {
        return (
            <div>
                <div className="recordHeader">
                    <table className="nostyle">
                        <tbody>
                        <tr>
                            <td>
                                <div className="leftPart">
                                    {this.isEditing()}
                                </div>
                            </td>
                            <td>
                                <div>
                                    <a className="toDelete">
                                        Delete Record
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
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func
}

export default RecordItemHeader