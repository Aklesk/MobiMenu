import React from 'react'
import ShortID from 'shortid'

export default class RecordName extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    }
    static contextTypes = {
        editing: React.PropTypes.func
    }
    componentDidUpdate() {
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
                r.name = document.getElementById(elem).value
                if (r.name.length > 1024) {r.name = r.name.substring(0, 1024)}
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div className="recordName">
                {
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.name}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                Public Name:
                            </div>
                            <div className="recordNameText">
                                {
                                    record.name.length > 0
                                    ?
                                    record.name
                                    :
                                    <span className="filler">-- Public Name --</span>
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
}