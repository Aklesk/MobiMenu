import React from 'react'
import { Link } from 'react-router'
import '../styles/listingContainer.less'

class MenuListItem extends React.Component {
    constructor() {super()}
    render() {
        const { section, rec } = this.props
        let isActive = window.location.href.split('/')[window.location.href.split('/').length - 1] == rec.guid
            ? "lineItem active"
            : "lineItem"
        return (
            <Link to={`/menu/${section}/${rec.guid}`} className={isActive}>
                <div className="lineText">
                    {
                        rec.intName.length > 0
                        ?
                        rec.intName
                        :
                        <span>&nbsp;</span>
                    }
                </div>
                <div className="lineDivider"></div>
            </Link>
        )
    }
}

export default MenuListItem