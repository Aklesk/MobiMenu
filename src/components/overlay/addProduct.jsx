import React from 'react';

// This is the overlay template for a question
class Question extends React.Component {
    constructor() {super()}
    render() {
        const { cancelFunc, header, message, okayFunc } = this.props
        const { recordDict } = this.context
        return (
            <div onClick={function(event){event.stopPropagation()}}>
                <div className="overlay" onClick={cancelFunc} />
                <div className="message messageLarge">
                    <h1 className="messageHeader">
                        {header}
                    </h1>
                    <div className="messageData">
                        <table className="nostyle messageTable" cellspacing="0">
                            <tbody>
                                {
                                    message.map((product) => {
                                        return (
                                            <tr key={`${product.guid}overlay`} onClick={okayFunc.bind(this, product.guid)}>
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

Question.contextTypes = {
    recordDict: React.PropTypes.object
}

export default Question