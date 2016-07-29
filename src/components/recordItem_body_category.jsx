import React from 'react';

class RecordItemBodyCategory extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div>
                <div className="recordBody">
                    <div className="labelText">
                        Public Name:
                    </div>
                    <div className="recordName">
                        {this.props.record.name}
                    </div>
                    <div className="labelText">
                        Menu Description:
                    </div>
                    <div className="recordDesc">
                        {
                            this.props.record.desc.length > 0
                            ?
                            this.props.record.desc
                            :
                            <span className="filler">No Description</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default RecordItemBodyCategory