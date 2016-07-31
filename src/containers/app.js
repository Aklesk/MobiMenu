import React from 'react';
import 'font-awesome/css/font-awesome.css';
import update from 'react-addons-update';

import '../styles/app.less';
import '../styles/nav.less';

// We need some base data for this example. This acts as a sort of pre-loaded resetting database.
import { exampleData } from '../db';

// This is the header at the top of the page.
import HeaderBox from '../components/header';

// This renders the footer at the bottom of the page.
import FooterArea from '../components/footer';

// This is the main app wrapper that holds everything else.
class App extends React.Component {
    static childContextTypes = {
        dataObj: React.PropTypes.object,
        recordDict: React.PropTypes.object,
        changeEditState: React.PropTypes.func,
        editing: React.PropTypes.object,
    };

    static propTypes = {
        children: React.PropTypes.object,
    };

    constructor() {
        super();

        // Create a new database using the example data (for demo purposes)
        const DataObj = exampleData();

        // First pack all records into a master dictionary for fast and easy lookup later. We'll maintain this as we go.
        const recordDict = {};
        Object.keys(DataObj).forEach((key) => {
            DataObj[key].forEach((rec) => {
                recordDict[rec.guid] = rec;
            });
        });

        // We're not dealing with asynchronus loading, or indeed any loading - just load the whole database into state
        // dataObj exists to provide a relational database structure (it has a list of all category objects, for
        // instance), while recordDict is very much non-relational; it's just a dictionary of *all* record items
        // keyed to record guid.
        this.state = {
            dataObj: DataObj,
            recordDict,
            editing: { rec: '', elem: '', saveFunc: null },
        };
    }

    // Context is used to push relevant state and functions to the app as a whole.
    getChildContext() {
        return {
            dataObj: this.state.dataObj,
            recordDict: this.state.recordDict,
            changeEditState: this.changeEditState,
            editing: this.state.editing,
        };
    }

    // This is run on every click anywhere in the app that is not explicitly prevented from doing anything. This
    // ends edit mode, and also is used to save records. For simplicity, each component with an edit mode bundles
    // in a function which will return a complete updated record, which is what saveFunc is.
    onClick = () => {
        if (this.state.editing.saveFunc != null) {
            this.updateRecord(this.state.editing.saveFunc());
        }
        this.setState({ editing: { rec: '', elem: '', saveFunc: null } });
    };

    // When the app enters into edit mode for an element, this is the function that is called. Propagation is stopped
    // to prevent edit mode immediately ending from the click event.
    changeEditState = (rec, elem, saveFunc, event) => {
        event.stopPropagation();
        this.setState({ editing: { rec, elem, saveFunc } });
    };

    // This takes a full record (that has a GUID) as an input and updates state with it. In a more full version
    // of this code, it might also send an update to a server, but at the moment it just updates state.
    updateRecord = (rec) => {
        const newRec = update(this.state.recordDict, {
            [rec.guid]: { $set: rec },
        });
        this.setState({
            recordDict: newRec,
        });
    };

    render() {
        return (
            <div onClick={this.onClick}>
                <HeaderBox />
                {this.props.children}
                <FooterArea />
            </div>
        );
    }
}

export default App;
