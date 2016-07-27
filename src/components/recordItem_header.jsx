import React from 'react';

// We're using componentWillUpdate and componentWillMount to get the record data out of the database to try to
// minimize the number of database calls.

class RecordItemHeader extends React.Component {
    constructor() {super()}
    onClick = (rec, elem) => {
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
                                    {
                                        this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "header"
                                        ?
                                        <input type="text" defaultValue={this.props.record.intName} />
                                        :
                                        <div className="headerText"
                                             onClick={this.onClick.bind(this, this.props.record.guid, "header")}>
                                            {this.props.record.intName}
                                        </div>
                                    }
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