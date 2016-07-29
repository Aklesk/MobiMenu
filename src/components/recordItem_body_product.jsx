import React from 'react';

class RecordItemBodyProduct extends React.Component {
    constructor() {super()}
    render() {
        const category = this.props.recordDict[this.props.record.category]
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
                        Price:
                    </div>
                    <div className="recordPrice">
                        {this.props.record.price}
                    </div>

                    <div className="spacer" />

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

                    <div className="spacer" />

                    <div className="labelText">
                        Product Category:
                    </div>
                    <div className="recordCategory">
                        {category.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default RecordItemBodyProduct