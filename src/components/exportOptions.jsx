import React from 'react'
import ShortID from 'shortid'
import { exportOptions } from 'interfaceConstants'

export default function() {
    return (
        <div>
            {
                exportOptions.map((text) => {
                    return (
                        <a key={ShortID.generate()}
                           style={{
                               float: "right",
                               textDecoration: "underline",
                               marginRight: "20px"
                           }}
                        >
                           {text}
                        </a>
                    )
                })
            }
        </div>
    )
}