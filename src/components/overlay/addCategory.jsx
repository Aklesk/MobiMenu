import React from 'react';

export default class AddCategory extends React.Component {
    static propTypes = {
        cancelFunc: React.PropTypes.func.isRequired,
        header: React.PropTypes.string.isRequired,
        message: React.PropTypes.array.isRequired,
        okayFunc: React.PropTypes.func.isRequired
    }
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
                        <table className="nostyle messageTable" cellSpacing="0">
                            <tbody>
                                {
                                    message.map((category) => {
                                        return (
                                            <tr key={`${category.guid}overlay`} onClick={okayFunc.bind(this, category.guid)}>
                                                <td>
                                                    <div className="singleColumn">
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