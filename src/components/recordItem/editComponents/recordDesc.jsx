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
                r.desc = document.getElementById(elem).value
                if (r.desc.length > 1024) {r.desc = r.desc.substring(0, 1024)}
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div className="recordDesc">
                {
                    editing().elem == this.editElement
                        ?
                        <textarea id={this.editElement}
                                  style={{width: "400px"}}
                                  defaultValue={record.desc}
                                  onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                Menu Description:
                            </div>
                            {
                                record.desc.length > 0
                                ?
                                <div className="textBlock">
                                    {record.desc}
                                </div>
                                :
                                <span className="filler">No Description</span>
                            }
                        </div>
                }
            </div>
        )
    }
}