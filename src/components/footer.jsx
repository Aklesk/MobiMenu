import React from 'react';

// This is the footer at the bottom of the page
class Footer extends React.Component {
    constructor() {super()}
    render() {
        return (
            <footer>
                © 2016 Mobi2Go Limited. All rights reserved.<br />
                <a>Terms of Service</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a>Privacy Policy</a>
            </footer>
        )
    }
}

export default Footer