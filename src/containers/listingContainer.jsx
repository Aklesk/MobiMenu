import React from 'react'
import '../styles/listingContainer.less'
import ShortID from 'shortid'

// This is where the list of tabs are stored.
import { mainTabs } from '../interfaceConstants.js'

// This is a single listing for the menu container
import MenuListItem from '../components/menuListItem.jsx'

class ListingContainer extends React.Component {
    constructor() {super()}
    render() {
        const recs = this.context.dataObj[this.props.params.section].map((rec, i) =>
            <MenuListItem section={this.props.params.section} rec={rec} key={ShortID.generate()} />
            )
        return (
            <div id="listingContainer" className="grid_12">
                <table className="nostyle">
                    <tbody>
                        <tr>
                            <td>
                                <div className="leftListing">
                                    <h1>
                                        {mainTabs[this.props.params.section].label}
                                    </h1>
                                    <div className="leftContent">
                                        {
                                            recs.length > 0
                                            ?
                                                recs
                                            :
                                            <div className="noRecords">
                                                {`No data. Please add a ${mainTabs[this.props.params.section].singular.toLowerCase()}.`}
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
                                            this.props.params.record == undefined
                                            ?
                                            <div className="record">
                                                <div className="recordHeader">
                                                    <div className="placeholderHeader">
                                                        {`⬅ Please select a ${mainTabs[this.props.params.section].singular.toLowerCase()}.`}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            this.props.children
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

ListingContainer.contextTypes = {
    dataObj: React.PropTypes.object
}

export default ListingContainer