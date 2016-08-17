import React from 'react'
import ShortID from 'shortid'
import { exportOptions } from 'interfaceConstants'

export default function() {
    const ExportList = exportOptions.map(text =>
        <a key={ShortID.generate()} style={{float: "right", textDecoration: "underline", marginRight: "20px"}}>
            {text}
        </a>
    )
    return (
        <div>{ExportList}</div>
    )
}