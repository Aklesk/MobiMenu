import React from 'react'
import ShortID from 'shortid'

export default class ProductCategory extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired
    }
    static contextTypes = {
        dataObj: React.PropTypes.object,
        editing: React.PropTypes.func,
        overlay: React.PropTypes.func,
        recordDict: React.PropTypes.object,
        updateRecord: React.PropTypes.func
    }
    editElement = ShortID.generate()
    onClick = (event) => {
        const { record } = this.props
        const { dataObj, editing, overlay, updateRecord } = this.context

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
                    onClick={this.onClick.bind(this, record.guid, this.editElement)}
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