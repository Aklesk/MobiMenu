import React from 'react'
import _ from 'lodash'

// This is the overlay template for a question
export default class AddProduct extends React.Component {
    static propTypes = {
        cancelFunc: React.PropTypes.func.isRequired,
        header: React.PropTypes.string.isRequired,
        message: React.PropTypes.array.isRequired,
        okayFunc: React.PropTypes.func.isRequired
    }
    componentDidMount() {
        document.getElementById("productSearch").focus()
    }
    onKeyUp = (event) => {
        this.setState({
            filter: event.target.value
        })
        return
    }
    static contextTypes = {
        recordDict: React.PropTypes.object
    }
    state = {
        filter: ""
    }
    render() {
        const { cancelFunc, header, message, okayFunc } = this.props
        const { recordDict } = this.context
        const productList = message.filter((p) => {
            // Filter to only match the beginnings of words, and remove excess whitespace from the search target.
            const f = RegExp(`(?=.*\\b${_.trim(this.state.filter).split(/\s+/).join('\\b)(?=.*\\b')}).*$`, 'i')
            const cat = ( recordDict[p.category] || {intName: ""} )
            return f.test(`${p.intName.replace(/\s+/g, ' ')} ${cat.intName.replace(/\s+/g, ' ')}`)
        })
        return (
            <div onClick={function(event){event.stopPropagation()}}>
                <div className="overlay" onClick={cancelFunc} />
                <div className="message messageLarge">
                    <h1 className="messageHeader">
                        {header}
                    </h1>
                    <input id="productSearch" type="search" placeholder="Filter products" onKeyUp={this.onKeyUp}/>
                    <div className="messageData">
                        {
                            productList.length > 0
                            ?
                            <table className="nostyle messageTable" cellSpacing="0">
                                <tbody>
                                {
                                    productList.map((product) => {
                                        return (
                                            <tr key={`${product.guid}overlay`}
                                                onClick={okayFunc.bind(this, product.guid)}>
                                                <td>
                                                    <div className="leftColumn">
                                                        {
                                                            product.intName.length > 0
                                                                ?
                                                                product.intName
                                                                :
                                                                <span className="filler">-- Unnamed Product --</span>
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="rightColumn">
                                                        {
                                                            recordDict[product.category] != undefined
                                                                ?
                                                                recordDict[product.category].intName
                                                                :
                                                                <span className="filler">-- No Category --</span>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            :
                            <span className="filler">No match, or all matches already on this menu.</span>
                        }
                    </div>
                    <div className="options">
                        <button id="cancel" onClick={cancelFunc}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}