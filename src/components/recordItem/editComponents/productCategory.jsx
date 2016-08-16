import React from 'react'

export default class ProductCategory extends React.Component {
    static contextTypes = {
        dataObj: React.PropTypes.object,
        overlay: React.PropTypes.func,
        recordDict: React.PropTypes.object,
        updateRecord: React.PropTypes.func
    }
    onClick = (event) => {
        const { editing, record } = this.props
        const { dataObj, overlay, updateRecord } = this.context

        overlay(
            "Choose Category",
            dataObj.categories,
            "addCategory",
            (guid) => {
                record.category = guid
                updateRecord(record)
            }
        )
    }
    render() {
        const { record } = this.props
        const { recordDict } = this.context
        return(
            <div className="productCategory">
                <div
                    className="editable"
                    onClick={this.onClick.bind(this, record.guid, "productCategoryEdit")}
                >
                    <div className="labelText">
                        Product Category:
                    </div>
                    {
                        recordDict[record.category] != undefined
                        ?
                        <div>
                            {
                                recordDict[record.category].intName.length > 0
                                ?
                                recordDict[record.category].intName
                                :
                                <span className="filler"> -- Unnamed Category -- </span>
                            }
                        </div>
                        :
                        <span className="filler"> -- No Category -- </span>
                    }
                </div>
            </div>
        )
    }
}