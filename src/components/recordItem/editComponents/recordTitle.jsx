import React from 'react'
import ShortID from 'shortid'

export default class RecordTitle extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    }
    static contextTypes = {
        editing: React.PropTypes.func
    }
    // ComponentDidMount will fire if we create a new record from the 404 page or with no record selected
    componentDidMount() {
        const { record } = this.props
        const { editing } = this.context

        // If this is a brand new record just created, drop the user into editing mode.
        if (record.newRec != undefined && editing().rec == "") {
            editing(
                record.guid,
                this.editElement,
                () => {
                    record.intName = document.getElementById(this.editElement).value
                    return record
                }
            )
        }

        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    // ComponentDidMount will fire if we create a new record from any other record
    componentDidUpdate() {
        const { record } = this.props
        const { editing } = this.context

        // If this is a brand new record just created, drop the user into editing mode.
        if (record.newRec != undefined && editing().rec == "") {
            editing(
                record.guid,
                this.editElement,
                () => {
                    record.intName = document.getElementById(this.editElement).value
                    return record
                }
            )
        }

        if (document.getElementById(this.editElement) != null) {
            document.getElementById(this.editElement).focus()
        }
    }
    editElement = ShortID.generate()
    onClick = (guid, elem, event) => {
        this.context.editing(
            guid,
            elem,
            (r) => {
                r.intName = document.getElementById(elem).value
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div>
                {
                    editing().elem == this.editElement
                        ?
                        <div className="leftPart">
                            <input id={this.editElement}
                                   type="text"
                                   style={{width: "326px"}}
                                   defaultValue={record.intName}
                                   onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        :
                        <div className="leftPart editable"
                             onClick={this.onClick.bind(this, record.guid, this.editElement)}
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
            </div>
        )
    }
}