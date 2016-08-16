import React from 'react'
import { Link } from 'react-router'

export default class MenuListItem extends React.Component {
    render() {
        const { section, rec } = this.props
        return (
            <Link to={`/menu/${section}/${rec.guid}`} className={
                window.location.href.split('/')[window.location.href.split('/').length - 1] == rec.guid
                ? "lineItem active"
                : "lineItem"
            }>
                <div className="lineText">
                    {
                        rec.intName.length > 0
                        ?
                        rec.intName
                        :
                        <span className="filler"> -- Unnamed -- </span>
                    }
                </div>
                <div className="lineDivider"></div>
            </Link>
        )
    }
}