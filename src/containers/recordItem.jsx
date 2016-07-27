import React from 'react';

// The header doesn't change between categories, so we can leave it the same React component
import RecordItem_Header from '../components/recordItem_header.jsx'

// The body of each record changes depending on the category, though.
import RecordItem_Body_Category from '../components/recordItem_body_category.jsx'
import RecordItem_Body_Menu from '../components/recordItem_body_menu.jsx'
import RecordItem_Body_Product from '../components/recordItem_body_product.jsx'

// This is a single record entry.
// Note that modifiers and modifier groups are not implemented as of yet, so there is no need to check for them.
class RecordItem extends React.Component {
    constructor(props) {super(props)}
    render() {
        const record = this.context.recordDict[this.props.params.record]
        return (
            <div className="record">
                <RecordItem_Header record={record} />
                {this.props.params.section == "menus" ? <RecordItem_Body_Menu recordDict={this.context.recordDict} record={record} /> : <div />}
                {this.props.params.section == "categories" ? <RecordItem_Body_Category recordDict={this.context.recordDict} record={record} /> : <div />}
                {this.props.params.section == "products" ? <RecordItem_Body_Product recordDict={this.context.recordDict} record={record} /> : <div />}
            </div>
        );
    }
}

RecordItem.contextTypes = {
    recordDict: React.PropTypes.object
}

export default RecordItem