import React from 'react'
import 'styles/recordView.less'
import ShortID from 'shortid'

// This is where the list of tabs are stored.
import { mainTabs } from 'interfaceConstants'

// This is a single listing for the menu container
import MenuListItem from 'components/menuListItem'

export default class RecordView extends React.Component {
    static contextTypes = {
        addRecord: React.PropTypes.func,
        dataObj: React.PropTypes.object,
        recordDict: React.PropTypes.object
    }
    render() {
        const { children, params } = this.props
        const { dataObj, recordDict } = this.context
        const { label, singular } = mainTabs[params.section]
        const recs = dataObj[params.section].map((rec, i) =>
            <MenuListItem key={ShortID.generate()} record={rec} section={params.section} />
            )
        return (
            <div id="recordView" className="grid_12">
                <table className="nostyle">
                    <tbody>
                        <tr>
                            <td>
                                <div className="leftListing">
                                    <div>
                                        <h1>
                                            {label}
                                        </h1>
                                        <button className="addNewButton"
                                                onClick={this.context.addRecord.bind(this, singular.toLowerCase())}
                                        >
                                            {`New ${singular}`}
                                        </button>
                                    </div>
                                    <div className="leftContent">
                                        {
                                            recs.length > 0
                                            ?
                                            recs
                                            :
                                            <div className="noRecords">
                                                {`No data. Please add a ${singular.toLowerCase()}.`}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="rightListing">
                                    <h1>
                                        &nbsp;
                                    </h1>
                                    <div className="rightContent">
                                        {
                                            params.record == undefined
                                            ?
                                            <div className="record">
                                                <div className="recordHeader">
                                                    <div className="placeholderHeader">
                                                        {`⬅ Please select a ${singular.toLowerCase()}.`}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                {
                                                    recordDict[params.record] != undefined
                                                    ?
                                                    children
                                                    :
                                                    <div className="record">
                                                        <div className="recordHeader">
                                                            <div className="notFoundHeader">
                                                                {`404: ${singular.toUpperCase()} NOT FOUND`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}