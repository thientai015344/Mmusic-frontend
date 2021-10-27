import './Title.css'
import React, { Component } from 'react';

class Title extends Component {
    render() {
        return (
            <>
                <h2 className="title Wrap">
                    {this.props.title}
                </h2>
            </>
        );
    }
}

export default Title;