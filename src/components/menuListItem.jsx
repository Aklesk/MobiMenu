import React from 'react'
import { Link } from 'react-router'
import '../styles/listingContainer.less'

class MenuListItem extends React.Component {
    constructor() {super()}
    render() {
        let isActive = window.location.href.split('/')[window.location.href.split('/').length - 1] == this.props.rec.guid
            ? "lineItem active"
            : "lineItem"
        return (
            <Link to={`/menu/${this.props.section}/${this.props.rec.guid}`} className={isActive}>
                <div className="lineText">{this.props.rec.intName}</div>
                <div className="lineDivider"></div>
            </Link>
        )
    }
}

export default MenuListItem