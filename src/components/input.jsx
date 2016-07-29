import React from 'react';

class Input extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        document.getElementById(this.props.elem).focus()
    }
    render() {
        return (
            <input id={this.props.elem}
                   type="text"
                   style={{width: this.props.width}}
                   defaultValue={this.props.defaultVal}
                   onClick={(e) => e.stopPropagation()}
            />
        )
    }
}

export default Input