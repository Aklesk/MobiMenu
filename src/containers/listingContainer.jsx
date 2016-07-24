import React from 'react';
import '../styles/listingContainer.less';
import ShortID from 'shortid';
import { mainTabs } from '../interfaceConstants.js'

// This is a single listing for the menu container
import MenuListItem from '../components/menuListItem.jsx';

class ListingContainer extends React.Component {
    constructor() {super()}
    render() {
        const menuRecords = this.context.dataObj[this.props.params.section].length > 0
            ? this.context.dataObj[this.props.params.section].map((rec, i) => {
                return <MenuListItem section={this.props.params.section} rec={rec} key={ShortID.generate()} />
                })
            : <div>No data. Please add a record.</div>
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
                                        {menuRecords}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="rightListing">
                                    <h1>
                                        &nbsp;
                                    </h1>
                                    <div className="rightContent">
                                        {this.props.children}
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