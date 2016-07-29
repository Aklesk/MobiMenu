import React from 'react';

// We're using componentWillUpdate and componentWillMount to get the record data out of the database to try to
// minimize the number of database calls.

class RecordItemHeader extends React.Component {
    constructor() {
        super()
    }
    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record
            rec.intName = document.getElementById("intNameEdit").value
            return rec
        }
        this.context.changeEditState(rec, elem, saveFunc, event)
    }
    render() {
        return (
            <div>
                <div className="recordHeader">
                    <table className="nostyle">
                        <tbody>
                        <tr>
                            <td>
                                {
                                    this.context.editing.rec == this.props.record.guid && this.context.editing.elem == "header"
                                    ?
                                    <div className="leftPart">
                                        <input id="intNameEdit"
                                               type="text"
                                               style={{width: "326px"}}
                                               defaultValue={this.props.record.intName}
                                               onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    :
                                    <div className="leftPart editable"
                                             onClick={this.onClick.bind(this, this.props.record.guid, "header")}
                                        >
                                        <div className="headerText">
                                            {this.props.record.intName}
                                        </div>
                                    </div>
                                }
                            </td>
                            <td>
                                <div className="rightPart">
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