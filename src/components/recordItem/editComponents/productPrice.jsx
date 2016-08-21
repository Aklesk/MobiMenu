import React from 'react'
import ShortID from 'shortid'

// These MUST BE UNIQUE
const editElement = "ProductPriceEdit"

export default class ProductPrice extends React.Component {
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
                let val = +document.getElementById(elem).value
                if (val == NaN) {val = 0}
                r.price = val
                return r
            },
            event
        )
    }
    render() {
        const { record } = this.props
        const { editing } = this.context
        return(
            <div className="ProductPrice">
                {
                    editing().elem == this.editElement
                        ?
                        <input id={this.editElement}
                               type="number"
                               style={{width: "90px"}}
                               defaultValue={record.price}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, this.editElement)}
                        >
                            <div className="labelText">
                                Price:
                            </div>
                            {record.price}
                        </div>
                }
            </div>
        )
    }
}