import React from 'react';

// This is the overlay template for a question
class Question extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div>
                <div className="overlay" onClick={this.props.cancelFunc.bind(this, "", "", "", null)} />
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
                        <button id="cancel" onClick={this.props.cancelFunc.bind(this, "", "", "", null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Question