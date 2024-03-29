import React from 'react'
import ShortID from 'shortid'

export default class ProductDisplayPrice extends React.Component {
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
                r.disprice = document.getElementById(elem).value
                if (r.disprice.length > 1024) {r.disprice = r.disprice.substring(0, 1024)}
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div className="ProductDisplayPrice">
                {
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.disprice}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                Display Price:
                            </div>
                            {
                                record.disprice.length > 0
                                ?
                                record.disprice
                                :
                                <span className="filler">No Display Price</span>
                            }
                        </div>
                }
            </div>
        )
    }
}