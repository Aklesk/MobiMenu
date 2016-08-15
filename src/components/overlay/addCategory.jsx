import React from 'react';

// This is the overlay template for a question
class Question extends React.Component {
    constructor() {super()}
    render() {
        const { cancelFunc, header, message, okayFunc } = this.props
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
                                    message.map((category) => {
                                        return (
                                            <tr key={`${category.guid}overlay`} onClick={okayFunc.bind(this, category.guid)}>
                                                <td>
                                                    <div className="leftColumn">
                                                        {category.intName}
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

export default Question