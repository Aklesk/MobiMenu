import React from 'react';
import '../styles/listingContainer.less';
import ShortID from 'shortid';

// This is where the list of tabs are stored.
import { mainTabs } from '../interfaceConstants';

// This is a single listing for the menu container
import MenuListItem from '../components/menuListItem';

function ListingContainer(props, context) {
    const recs = context.dataObj[props.params.section].map((rec) =>
        <MenuListItem section={props.params.section} rec={rec} key={ShortID.generate()} />
    );
    return (
        <div id="listingContainer" className="grid_12">
            <table className="nostyle">
                <tbody>
                    <tr>
                        <td>
                            <div className="leftListing">
                                <h1>
                                    {mainTabs[props.params.section].label}
                                </h1>
                                <div className="leftContent">
                                    {
                                        recs.length > 0
                                            ?
                                            recs
                                            :
                                            `No data. Please add a ${mainTabs[props.params.section].singular.toLowerCase()}.`
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
                                    {props.children}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

ListingContainer.contextTypes = {
    dataObj: React.PropTypes.object,
};

ListingContainer.propTypes = {
    params: React.PropTypes.any,
    children: React.PropTypes.object,
};


export default ListingContainer;
