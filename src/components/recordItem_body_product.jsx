import React from 'react';

class RecordItemBodyProduct extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div>
                <div className="recordBody">
                    <div className="recordName">
                        {this.props.record.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordItemBodyProduct