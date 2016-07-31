import React from 'react';

function RecordItemBodyProduct(props) {
    const category = props.recordDict[props.record.category];

    const description = props.record.desc.length > 0 ? props.record.desc :
        <span className="filler">No Description</span>;

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
                    Price:
                </div>
                <div className="recordPrice">
                    {props.record.price}
                </div>

                <div className="spacer" />

                <div className="labelText">
                    Menu Description:
                </div>
                <div className="recordDesc">
                    {description}
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

RecordItemBodyProduct.propTypes = {
    record: React.PropTypes.object,
    recordDict: React.PropTypes.object,
};

export default RecordItemBodyProduct;
