import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';

import App from './containers/app';

// This renders the main body of the page, where most of the action takes place
import MainBody from './containers/mainBody';

// This renders the Listing Container, a wrapper for the editing that the user does
import ListingContainer from './containers/listingContainer';

// This is the holder for records when being edited.
import RecordItem from './containers/recordItem';

render((
    <Router history={browserHistory}>
        <Redirect from="/" to="/menu/" />
        <Redirect from="/menu/" to="/menu/menus/" />
        <Route path="/menu/" component={App}>
            <Route component={MainBody}>
                <Route path="/menu/:section" component={ListingContainer}>
                    <Route path="/menu/:section/:record" component={RecordItem} />
                </Route>
            </Route>
        </Route>
    </Router>
), document.getElementById('app'));
