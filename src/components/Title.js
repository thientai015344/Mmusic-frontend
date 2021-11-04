import './Title.css'
import React, { Component } from 'react';

class Title extends Component {
    render() {
        return (
            <>
                <h2 className="titlename ">
                    {this.props.title}
                </h2>
            </>
        );
    }
}

export default Title;