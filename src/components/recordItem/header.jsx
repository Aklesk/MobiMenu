import React from 'react'

// We're using componentWillUpdate and componentWillMount to get the record data out of the database to try to
// minimize the number of database calls.

class RecordItemHeader extends React.Component {
    constructor() {
        super()
    }
    componentDidUpdate() {
        if (document.getElementById("intNameEdit") != null) {
            document.getElementById("intNameEdit").focus()
        }
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
        const { record } = this.props
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
    editing: React.PropTypes.func
}

export default RecordItemHeader