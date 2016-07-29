import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import './styles/app.less'
import './styles/nav.less'
import 'font-awesome/css/font-awesome.css'
import update from 'react-addons-update'

// We need some base data for this example. This acts as a sort of pre-loaded resetting database.
import { exampleData } from './db.js'
import { menu } from './db.js'
import { category } from './db.js'
import { product } from './db.js'

// This is the header at the top of the page.
import HeaderBox from './components/header.jsx'

// This renders the main body of the page, where most of the action takes place
import MainBody from './containers/mainBody.jsx'

// This renders the footer at the bottom of the page.
import FooterArea from './components/footer.jsx'

// This renders the Listing Container, a wrapper for the editing that the user does
import ListingContainer from './containers/listingContainer.jsx'

// This is the holder for records when being edited.
import RecordItem from './containers/recordItem.jsx'

// This is needed for proper styling due to the way that this project was imported from an active site.
document.body.className = "m2g-console"

// This is the main app wrapper that holds everything else.
class App extends React.Component {
    constructor() {
        super()

        // Create a new database using the example data (for demo purposes)
        const DataObj = exampleData()

        // First pack all records into a master dictionary for fast and easy lookup later. We'll maintain this as we go.
        const recordDict = {}
        for (const key in DataObj) {
            DataObj[key].forEach(
                rec => recordDict[rec.guid] = rec
            )
        }

        // We're not dealing with asynchronus loading, or indeed any loading - just load the whole database into state
        // dataObj exists to provide a relational database structure (it has a list of all category objects, for
        // instance), while recordDict is very much non-relational; it's just a dictionary of *all* record items
        // keyed to record guid.
        this.state = {
            dataObj: DataObj,
            recordDict: recordDict,
            editing: {rec: "", elem: "", saveFunc: null}
        }
    }

    // This takes a full record (that has a GUID) as an input and updates state with it. In a more full version
    // of this code, it might also send an update to a server, but at the moment it just updates state.
    updateRecord = (rec) => {
        let newRec = update(this.state.recordDict, {
            [rec.guid]: {$set: rec}
        })
        this.setState({
            recordDict: newRec
        })
    }

    // When the app enters into edit mode for an element, this is the function that is called. Propagation is stopped
    // to prevent edit mode immediately ending from the click event.
    changeEditState = (rec, elem, saveFunc, event) => {
        event.stopPropagation()
        this.setState({editing: {rec, elem, saveFunc}})
    }

    // Context is used to push relevant state and functions to the app as a whole.
    getChildContext() {return {
        dataObj: this.state.dataObj,
        recordDict: this.state.recordDict,
        changeEditState: this.changeEditState,
        editing: this.state.editing
    }}

    // This is run on every click anywhere in the app that is not explicitly prevented from doing anything. This
    // ends edit mode, and also is used to save records. For simplicity, each component with an edit mode bundles
    // in a function which will return a complete updated record, which is what saveFunc is.
    onClick = (event) => {
        if (this.state.editing.saveFunc != null) {
            this.updateRecord(this.state.editing.saveFunc())
        }
        this.setState({editing: {rec: "", elem: "", saveFunc: null}})
    }

    render() {
        return (
            <div
                onClick={this.onClick}
            >
                <HeaderBox />
                {this.props.children}
                <FooterArea />
            </div>
        )
    }
}

App.childContextTypes = {
    dataObj: React.PropTypes.object,
    recordDict: React.PropTypes.object,
    changeEditState: React.PropTypes.func,
    editing: React.PropTypes.object
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Redirect from="/" to="/menu/" />
        <Redirect from="/menu/" to="/menu/menus/" />
        <Route path="/menu/" component={App}>
            <Route component={MainBody}>
                <Route path="/menu/:section" component={ListingContainer}>
                    <Route path="/menu/:section/:record" component={RecordItem}/>
                </Route>
            </Route>
        </Route>
    </Router>
),
    document.querySelector('#root')
)