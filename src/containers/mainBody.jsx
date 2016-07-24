import React from 'react';

// This renders the little group of export options just under the page header
import ExportOptions from '../components/exportOptions.jsx'

// This renders main tabs at the top area
import MainTabs from '../components/mainTabs.jsx'

class MainBody extends React.Component {
    constructor() {super()}
    render() {
        return (
            <div className="main">
                <div className="container-fluid container_12">
                    <h1>Menu Management</h1>
                    <div className="clear" />
                    <div className="clear" />
                    <ExportOptions />
                    <MainTabs section={this.props.params.section}/>
                    {this.props.children} 
                </div>
            </div>
        );
    }
}

export default MainBody