import React from 'react';
import { Link } from 'react-router';
import '../styles/listingContainer.less';

function MenuListItem(props) {
    const isActive = window.location.href.split('/')[window.location.href.split('/').length - 1] === props.rec.guid
        ? 'lineItem active'
        : 'lineItem"';
    return (
        <Link to={`/menu/${props.section}/${props.rec.guid}`} className={isActive}>
            <div className="lineText">
                {
                    props.rec.intName.length > 0
                    ?
                    props.rec.intName
                    :
                        <span>&nbsp;</span>
                }
            </div>
            <div className="lineDivider"></div>
        </Link>
    );
}

MenuListItem.propTypes = {
    rec: React.PropTypes.any,
    section: React.PropTypes.any,
};

export default MenuListItem;
