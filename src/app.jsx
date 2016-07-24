import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Redirect, browserHistory } from 'react-router'
import './styles/app.less'
import './styles/nav.less'
import 'font-awesome/css/font-awesome.css'
import update from 'react-addons-update';

// We need some base data for this example - let's load it in now.
import DataObj from './exampleData.js'

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

// This is the main app wrapper that holds everything else.
class App extends React.Component {
    constructor() {
        super()

        // First pack all records into a master dictionary for fast and easy lookup later. We'll maintain this as we go.
        let recordDict = {}
        Object.keys(DataObj).forEach( (key) => {
            DataObj[key].forEach( (rec) => {
                recordDict[rec.guid] = rec
            })
        })
        this.state = {
            dataObj: DataObj,
            recordDict: recordDict,
            editing: {rec: "", elem: ""}
        }
    }
    changeEditState = (rec, elem) => {
        this.setState({editing: {rec, elem}})
    }
    getChildContext() {return {
        dataObj: this.state.dataObj,
        recordDict: this.state.recordDict,
        changeEditState: this.changeEditState,
        editing: this.state.editing
    }}
    render() {
        return (
            <div>
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
), document.querySelector('#root'))