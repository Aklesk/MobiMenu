import React from 'react';
import ShortID from 'shortid';
import { Link } from 'react-router';
import { mainTabs } from '../interfaceConstants.js'
import '../styles/mainTabs.less'

class MainTabs extends React.Component {
    constructor() {super()}
    render() {
        const Tabs = Object.keys(mainTabs).map((data, i) => {
            let classText = "button"
            data == this.props.section ? classText = "button active" : classText = "button"
            return (
                <Link to={`/menu/${data}`} key={ShortID.generate()} className={classText}>
                    {mainTabs[data].label}
                </Link>
            );
        });
        return (
            <div id="menu-navigation" className="grid_12">
                <div className="btn-group">
                    {Tabs}
                </div>
            </div>
        );
    }
}

export default MainTabs