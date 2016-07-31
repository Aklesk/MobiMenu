import React from 'react';
import ShortID from 'shortid';
import Textarea from './textarea';


// This is a single entry of a product, which will appear under a category header. This is exclusively used
// by the CategoryGroup element, and has no other purpose.
const CategoryItem = (props) => (
    <div className="recordProduct">
        {props.product.intName}
    </div>
);

CategoryItem.propTypes = {
    product: React.PropTypes.object,
};

// This is a category, which acts as a header for, and contains, products.
const CategoryGroup = (props) => {
    const items = props.products.map(prod =>
        <CategoryItem product={props.recordDict[prod]} key={ShortID.generate()} />
    );
    return (
        <div className="recordCategoryGroup">
            <div className="recordCategoryHeader">
                {props.category.intName}
            </div>
            {items}
        </div>
    );
};

CategoryGroup.propTypes = {
    products: React.PropTypes.array,
    category: React.PropTypes.object,
    recordDict: React.PropTypes.object,
};

class RecordItemBodyMenu extends React.Component {
    static propTypes = {
        record: React.PropTypes.shape({
            name: React.PropTypes.string,
            guid: React.PropTypes.string,
            desc: React.PropTypes.string,
            products: React.PropTypes.array,
        }),
        recordDict: React.PropTypes.object,
    };

    onClick = (rec, elem, event) => {
        const saveFunc = () => {
            const rec = this.props.record;
            if (elem === 'recordDescEdit') {
                rec.desc = document.getElementById(elem).value;
            }
            return rec;
        };
        this.context.changeEditState(rec, elem, saveFunc, event);
    };

    getCategories() {
        const categories = {};
        this.props.record.products.forEach((guid) => {
            const category = this.props.recordDict[guid].category;
            if (categories[category] === undefined) {
                categories[category] = [];
            }
            categories[category].push(guid);
        });
        return categories;
    }
    listItems() {
        const categories = this.getCategories();
        return Object.keys(categories).map((key) => (
            <CategoryGroup
                recordDict={this.props.recordDict}
                products={categories[key]}
                category={this.props.recordDict[key]}
                key={ShortID.generate()}
            />
        ));
    }

    render() {
        return (
            <div>
                <div className="recordHours">
                    <div className="labelText">Hours Active:</div>
                    <div className="labelText">Days Active:</div>
                </div>

                <hr />

                <div className="recordBody">

                    <div className="labelText">
                        Public Name:
                    </div>
                    <div className="recordName">
                        {this.props.record.name}
                    </div>
                    <div className="recordDesc">
                        {
                            this.context.editing.rec === this.props.record.guid && this.context.editing.elem === 'recordDescEdit'
                            ?
                                <Textarea
                                    elem="recordDescEdit"
                                    width="400px"
                                    defaultVal={this.props.record.desc}
                                />
                            :
                                <div className="editable" onClick={this.onClick.bind(this, this.props.record.guid, 'recordDescEdit')}>
                                    <div className="labelText">
                                        Menu Description:
                                    </div>
                                    {
                                        this.props.record.desc.length > 0
                                        ?
                                        this.props.record.desc
                                        :
                                            <span className="filler">No Description</span>
                                    }
                                </div>
                        }
                    </div>

                    <div className="spacer" />

                    <div className="labelText">
                        Menu Contents:
                    </div>
                    {this.listItems()}

                </div>
            </div>
        );
    }
}

RecordItemBodyMenu.contextTypes = {
    editing: React.PropTypes.object,
    changeEditState: React.PropTypes.func,
};

export default RecordItemBodyMenu;
