import React from 'react';
const logo01 = require('img/logo_01.svg')
const logo02 = require('img/logo_02.svg')

// This is the header at the top of the page, and nothing more.
export default function() {
    return (
        <header>
            <div className="primary">
                <div className="row-fluid">
                    <div className="logo-container span4">
                        <a>
                            <img className="logo" alt="Mobi2Go" src={logo01} />
                            <img className="logo-text" alt="Mobi2Go" src={logo02} />
                        </a>
                    </div>
                    <div className="links span8">
                        <a>My Account</a><a>Help</a><a>Log Out</a>
                    </div>
                </div>
            </div>
            <div className="secondary">
                <div className="row-fluid">
                    <div className="breadcrumbs left">
                        <a className="nav-store"><i className="fa fa-map-marker"></i>Casa de Queso</a>
                    </div>
                    <div className="links right">
                        <a className="nav-sales"><i className="fa fa-home"></i>Sales</a>
                        <a className="nav-stock"><i className="fa fa-list"></i>Stock</a>
                        <a className="nav-menu active"><i className="fa fa-cutlery"></i>Menu</a>
                        <a className="nav-website"><i className="fa fa-globe"></i>Website</a>
                        <a className="nav-settings"><i className="fa fa-cog"></i>Settings</a>
                    </div>
                </div>
            </div>
        </header>
    )
}