import React from 'react'

// These MUST BE UNIQUE
const baseElement = "ProductDisplayPrice"
const editElement = "ProductDisplayPriceEdit"

class ProductDisplayPrice extends React.Component {
    constructor() {
        super()
    }
    componentDidUpdate() {
        if (document.getElementById(editElement) != null) {
            document.getElementById(editElement).focus()
        }
    }
    onClick = (rec, elem, event) => {
        const { editing, record } = this.props
        const saveFunc = () => {
            const rec = record
            rec.disprice = document.getElementById(elem).value
            return rec
        }
        editing(rec, elem, saveFunc, event)
    }
    render() {
        const { editing, record } = this.props
        return(
            <div className={baseElement}>
                {
                    editing().elem == editElement
                        ?
                        <input id={editElement}
                               type="text"
                               style={{width: "400px"}}
                               defaultValue={record.disprice}
                               onClick={(e) => e.stopPropagation()}
                        />
                        :
                        <div
                            className="editable"
                            onClick={this.onClick.bind(this, record.guid, editElement)}
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


export default ProductDisplayPrice