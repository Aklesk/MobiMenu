import React from 'react'

// These MUST BE UNIQUE
const editElement = "ProductPriceEdit"

export default class ProductPrice extends React.Component {
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            let val = +document.getElementById(elem).value
            if (val == NaN) {val = 0}
            record.price = val
            return record
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className="ProductPrice">
                {
                    editing().elem == editElement
                        ?
                        <input id={editElement}
                               type="number"
                               style={{width: "90px"}}
                               defaultValue={record.price}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, editElement)}
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