import React from 'react';
import ShortID from 'shortid';


// This is a single entry of a product, which will appear under a category header. This is exclusively used
// by the CategoryGroup element, and has no other purpose.
const CategoryItem = function(props) {
    return(
        <div className="recordProduct">
            {props.product.intName}
        </div>
    )
}


// This is a category, which acts as a header for, and contains, products.
const CategoryGroup = function(props) {
    const items = props.products.map(prod =>
            <CategoryItem product={props.recordDict[prod]} key={ShortID.generate()}/>
    )
    return(
        <div className="recordCategoryGroup">
            <div className="recordCategoryHeader">
                {props.category.intName}
            </div>
            {items}
        </div>
    )
}


class RecordItemBodyMenu extends React.Component {
    constructor() {super()}
    getCategories() {
        const categories = {}
        this.props.record.products.map((guid) => {
            let category = this.props.recordDict[guid].category
            if (categories[category] == undefined) {categories[category] = []}
            categories[category].push(guid)
        })
        return categories
    }
    listItems() {
        const categories = this.getCategories()
        return Object.keys(categories).map((key) => {
            return (
                <CategoryGroup recordDict={this.props.recordDict}
                               products={categories[key]}
                               category={this.props.recordDict[key]}
                               key={ShortID.generate()}
                />
            )
        })
    }
    render() {
        return (
            <div>
                <div className="recordHours">
                    <div>HOURS ACTIVE:</div>
                    <div>DAYS ACTIVE:</div>
                </div>

                <hr />

                <div className="recordBody">
                    <div className="recordName">
                        {this.props.record.name}
                    </div>

                    {this.listItems()}

                </div>
            </div>
        )
    }
}

export default RecordItemBodyMenu