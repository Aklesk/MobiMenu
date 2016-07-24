import React from 'react';

class RecordItemBodyCategory extends React.Component {
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
        )
    }
}

export default RecordItemBodyCategory