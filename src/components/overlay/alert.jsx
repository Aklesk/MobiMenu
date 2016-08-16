import React from 'react';

// This is the overlay template for a question
export default class Alert extends React.Component {
    render() {
        const { header, message, okayFunc } = this.props
        return (
            <div>
                <div className="overlay" onClick={okayFunc} />
                <div className="message messageStandard">
                    <h1 className="messageHeader">
                        {header}
                    </h1>
                    <div className="messageText">
                        {message}
                    </div>
                    <div className="options">
                        <button id="okay" onClick={okayFunc.bind(this, null)}>
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}