import React from 'react'
import ShortID from 'shortid'

export default class MenuTimes extends React.Component {
    static contextTypes = {
        overlay: React.PropTypes.func
    }
    onClick = (rec, elem, event) => {
        const { overlay } = this.context
        overlay(
            "Not Implemented",
            "A series of days and times is slightly beyond the scope of this demo for the time being.",
            "alert",
            () => { overlay("", "", "", null) }
        )
    }
    render() {
        return(
            <div>
                <div className="recordHours editable"
                     onClick={this.onClick}
                >
                    <div className="labelText">
                        Active Times:
                    </div>
                    <div className="headerText">
                        <span className="filler">No days/times set</span>
                    </div>
                </div>
            </div>
        )
    }
}