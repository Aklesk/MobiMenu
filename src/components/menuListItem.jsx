import React from 'react'
import { Link } from 'react-router'

// This is a single line item of the lest of records on the left. This can be listing any of the record types
// based on which tab is selected.
export default class MenuListItem extends React.Component {
    static propTypes = {
        record: React.PropTypes.object.isRequired,
        section: React.PropTypes.string.isRequired
    }
    render() {
        const { section, record } = this.props
        return (
            <Link to={`/menu/${section}/${record.guid}`}
                  className={
                      window.location.href.split('/')[window.location.href.split('/').length - 1] == record.guid
                      ?
                      "lineItem active"
                      :
                      "lineItem"
                  }
            >
                <div className="lineText">
                    {
                        record.intName.length > 0
                        ?
                        record.intName
                        :
                        <span className="filler"> -- Unnamed -- </span>
                    }
                </div>

                <div className="lineDivider"></div>

            </Link>
        )
    }
}