import React from 'react';
import ShortID from 'shortid';
import { Link } from 'react-router';
import { mainTabs } from 'interfaceConstants'
import 'styles/mainTabs.less'

// These are the main tabs at the top of the active area that control editing section. They are dynamic,
// but do not rely on state or pass information anywhere other than the browser URL
export default function(props) {
    const { section } = props
    return (
        <div id="menu-navigation" className="grid_12">
            <div className="btn-group">
                {
                    Object.keys(mainTabs).map((data, i) => {
                        return (
                            <Link to={`/menu/${data}`}
                                  key={ShortID.generate()}
                                  className={data == section ? "button active" : "button"}
                            >
                                {mainTabs[data].label}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}