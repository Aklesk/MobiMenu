import React from 'react';

// This is the overlay template for a question
class Alert extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div>
                <div className="overlay" onClick={this.props.okayFunc} />
                <div className="message">
                    <h1 className="messageHeader">
                        {this.props.header}
                    </h1>
                    <div className="messageText">
                        {this.props.message}
                    </div>
                    <div className="options">
                        <button id="okay" onClick={this.props.okayFunc}>
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Alert