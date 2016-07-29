import React from 'react';

class Textarea extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        document.getElementById(this.props.elem).focus()
    }
    render() {
        return (
            <textarea id={this.props.elem}
                   style={{width: this.props.width}}
                   defaultValue={this.props.defaultVal}
                   onClick={(e) => e.stopPropagation()}
            />
        )
    }
}

export default Textarea