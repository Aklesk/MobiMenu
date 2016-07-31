import React from 'react';

// The header doesn't change between categories, so we can leave it the same React component
import RecordItemHeader from '../components/recordItem_header';

// The body of each record changes depending on the category, though.
import RecordItemBodyCategory from '../components/recordItem_body_category';
import RecordItemBodyMenu from '../components/recordItem_body_menu';
import RecordItemBodyProduct from '../components/recordItem_body_product';

// This is a single record entry.
// Note that modifiers and modifier groups are not implemented as of yet, so there is no need to check for them.
function RecordItem(props, context) {
    const record = context.recordDict[props.params.record];
    return (
        <div className="record">
            <RecordItemHeader record={record} />
            {props.params.section === 'menus' ? <RecordItemBodyMenu recordDict={context.recordDict} record={record} /> : <div />}
            {props.params.section === 'categories' ? <RecordItemBodyCategory recordDict={context.recordDict} record={record} /> : <div />}
            {props.params.section === 'products' ? <RecordItemBodyProduct recordDict={context.recordDict} record={record} /> : <div />}
        </div>
    );
}

RecordItem.contextTypes = {
    recordDict: React.PropTypes.object,
};

RecordItem.propTypes = {
    params: React.PropTypes.object,
};
export default RecordItem;
