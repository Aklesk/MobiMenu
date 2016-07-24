import React from 'react'
import ShortID from 'shortid'
import { exportOptions } from '../interfaceConstants.js'

class ExportOptions extends React.Component {
    constructor() {super()}
    render() {
        const ExportList = exportOptions.map((text) => {
            return (
                <a key={ShortID.generate()} style={{float: "right", textDecoration: "underline", marginRight: "20px"}}>
                    {text}
                </a>
            )
        })
        return (
            <div>{ExportList}</div>
        )
    }
}

export default ExportOptions