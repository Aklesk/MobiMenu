import React from 'react';

// This is the overlay template for a question
export default class Question extends React.Component {
    static propTypes = {
        cancelFunc: React.PropTypes.func.isRequired,
        header: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired,
        okayFunc: React.PropTypes.func.isRequired
    }
    render() {
        const { cancelFunc, header, message, okayFunc } = this.props
        return (
            <div>
                <div className="overlay" onClick={cancelFunc} />
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
                        <button id="cancel" onClick={cancelFunc}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}