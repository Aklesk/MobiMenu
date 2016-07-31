import React from 'react';

function RecordItemBodyCategory(props) {
    return (
        <div>
            <div className="recordBody">
                <div className="labelText">
                    Public Name:
                </div>
                <div className="recordName">
                    {props.record.name}
                </div>
                <div className="labelText">
                    Menu Description:
                </div>
                <div className="recordDesc">
                    {
                        props.record.desc.length > 0
                        ?
                        props.record.desc
                        :
                            <span className="filler">No Description</span>
                    }
                </div>
            </div>
        </div>
    );
}

RecordItemBodyCategory.propTypes = {
    record: React.PropTypes.object,
};

export default RecordItemBodyCategory;
