import React from 'react';

// This is the overlay template for a question
class Question extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div>
                <div className="overlay" onClick={this.props.cancelFunc} />
                <div className="message messageStandard">
                    <h1 className="messageHeader">
                        {this.props.header}
                    </h1>
                    <div className="messageText">
                        {this.props.message}
                    </div>
                    <div className="options">
                        <button id="okay" onClick={this.props.okayFunc.bind(this, null)}>
                            Okay
                        </button>
                        <button id="cancel" onClick={this.props.cancelFunc}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question