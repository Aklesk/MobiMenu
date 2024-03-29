import React from 'react';

// The header doesn't change between categories, so we can leave it the same React component
import RecordItem_Header from '../components/recordItem/header_all.jsx'

// The body of each record changes depending on the category, though.
import Category from '../components/recordItem/category.jsx'
import Menu from '../components/recordItem/menu.jsx'
import Product from '../components/recordItem/product.jsx'

// This is a single record entry.
// Note that modifiers and modifier groups are not implemented as of yet, so there is no need to check for them.
export default class RecordItem extends React.Component {
    static contextTypes = {
        recordDict: React.PropTypes.object
    }
    render() {
        const record = this.context.recordDict[this.props.params.record]
        return (
            <div className="record">
                <RecordItem_Header record={record} section={this.props.params.section} />
                {this.props.params.section == "menus" ? <Menu recordDict={this.context.recordDict} record={record} /> : <div />}
                {this.props.params.section == "categories" ? <Category recordDict={this.context.recordDict} record={record} /> : <div />}
                {this.props.params.section == "products" ? <Product recordDict={this.context.recordDict} record={record} /> : <div />}
            </div>
        )
    }
}