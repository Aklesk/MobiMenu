import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import './styles/app.less'
import 'font-awesome/css/font-awesome.css'
import _ from 'lodash'
import update from 'react-addons-update'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

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

        // We're not dealing with asynchronus loading, or indeed any loading - so we can load the whole database into state.
        // dataObj exists to provide a relational database structure (it has a list of all category objects, for
        // instance), while recordDict is very much non-relational; it's just a dictionary of *all* record items
        // keyed to record guid.
        this.state = {
            dataObj: DataObj,
            editing: {rec: "", elem: "", saveFunc: null},
            recordDict: recordDict,
            overlay: {header: "", message: "", okayFunc: null}
        }
    }

    // This completely deletes the record with the specified GUID.
    // Eventually this will be part of a versioning system and will simply set a deleted flag, but right now it deletes.
    deleteRecord = (guid) => {

        // Because we're reassigning a key to undefined, rather than changing an object, it must be updated
        // in both recordDict and the dataObj that gives us our section lists.
        // This data is needed to update dataObj
        let recordType = ""
        let index = null
        for (const key in this.state.dataObj) {
            const i = this.state.dataObj[key].findIndex((rec) => {
                if(rec.guid == guid){return true}
            })
            if (i != -1) {
                recordType = key
                index = i
            }
        }


        let newRec1 = update(this.state.dataObj, {
            [recordType]: {$splice: [[index, 1]]}
        })
        let newRec2 = update(this.state.recordDict, {
            [guid]: {$set: undefined}
        })
        this.setState({
            dataObj: newRec1,
            recordDict: newRec2
        })
    }

    // This is how components interact with editing. If called with no arguments, this returns the record currently
    // being edited. If called with arguments it changes editing.
    editing = (rec, elem, saveFunc, event) => {
        if (rec == undefined) {
            return this.state.editing
        }
        else {
            event.stopPropagation()
            this.setState({editing: {rec, elem, saveFunc}})
        }
    }

    // Context is used to push relevant state and functions to the app as a whole.
    getChildContext() {return {
        dataObj: this.state.dataObj,
        deleteRecord: this.deleteRecord,
        editing: this.editing,
        overlay: this.overlay,
        recordDict: this.state.recordDict,
        updateList: this.updateList
    }}

    // This is run on every click anywhere in the app that is not explicitly prevented from doing anything. This
    // ends edit mode, and also is used to save records. For simplicity, each component with an edit mode bundles
    // in a function which will return a complete updated record, which is what saveFunc is.
    onClick = (event) => {
        if (this.editing().saveFunc != null) {
            this.updateRecord(this.state.editing.saveFunc())
        }
        this.setState({editing: {rec: "", elem: "", saveFunc: null}})
    }

    // This is a method for displaying a full-page overlay, mostly used for confirmation "are you sure?" messages.
    overlay = (header, message, okayFunc) => {
        this.setState({overlay: {header, message, okayFunc}})
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

    // This is used when re-ordering records during a click and drag operation. It's functionally the same as
    // updateRecord, but if we were doing this with a proper database, it would not result in a save event.
    updateList = (rec) => {
        let newRec = update(this.state.recordDict, {
            [rec.guid]: {$set: rec}
        })
        this.setState({
            recordDict: newRec
        })
    }

    render() {
        return (
            <div
                onClick={this.onClick}
            >
                {
                    this.state.overlay.message != ""
                    ?
                    <div>
                        <div className="overlay"/>
                        <div className="message">
                            <h1 className="messageHeader">
                                {this.state.overlay.header}
                            </h1>
                            <div className="messageText">
                                {this.state.overlay.message}
                            </div>
                            <div className="options">
                                <div className="okay">
                                    <button onClick={this.state.overlay.okayFunc}>Okay</button>
                                </div>
                                <div className="cancel">
                                    <button onClick={this.overlay.bind(this, "", "", null)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div/>
                }
                <HeaderBox />
                {this.props.children}
                <FooterArea />
            </div>
        )
    }
}

App.childContextTypes = {
    dataObj: React.PropTypes.object,
    deleteRecord: React.PropTypes.func,
    editing: React.PropTypes.func,
    overlay: React.PropTypes.func,
    recordDict: React.PropTypes.object,
    updateList: React.PropTypes.func
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Redirect from="/" to="/menu/" />
        <Redirect from="/menu/" to="/menu/menus/" />
        <Route path="/menu/" component={DragDropContext(HTML5Backend)(App)}>
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