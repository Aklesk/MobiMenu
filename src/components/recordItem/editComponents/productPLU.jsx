import React from 'react'
import ShortID from 'shortid'

export default class RecordPLU extends React.Component {
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
                r.plu = document.getElementById(elem).value
                if (r.plu.length > 1024) {r.plu = r.plu.substring(0, 1024)}
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div className="recordPLU">
                {
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.plu}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                PLU:
                            </div>
                            {
                                record.plu.length > 0
                                ?
                                record.plu
                                :
                                <span className="filler">No PLU specified</span>
                            }
                        </div>
                }
            </div>
        )
    }
}