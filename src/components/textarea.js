import React from 'react';

class Textarea extends React.Component {
    static propTypes = {
        elem: React.PropTypes.any,
        width: React.PropTypes.number.isRequired,
        defaultVal: React.PropTypes.any,
    };

    componentDidMount() {
        document.getElementById(this.props.elem).focus();
    }

    render() {
        return (
            <textarea
                id={this.props.elem}
                style={{ width: this.props.width }}
                defaultValue={this.props.defaultVal}
                onClick={(e) => e.stopPropagation()}
            />
        );
    }
}

export default Textarea;
