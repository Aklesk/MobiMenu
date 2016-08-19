import React from 'react';

// This renders the little group of export options just under the page header
import ExportOptions from 'components/exportOptions'

// This renders main tabs at the top area
import MainTabs from 'components/mainTabs'

// This is a container that holds the main body.
export default function(props) {
    const { section } = props.params
    return (
        <div className="main">
            <div className="container-fluid container_12">
                <h1>Menu Management</h1>
                <div className="clear" />
                <div className="clear" />
                <ExportOptions />
                <MainTabs section={section}/>
                {props.children}
            </div>
        </div>
    )
}