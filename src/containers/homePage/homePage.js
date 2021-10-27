import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Homepage.scss'
import SliderContent from '../slider/SliderContent'
import Containert from '../../components/Container'
import SliderSinger from '../slider/SliderSinger';


class HomePage extends Component {

    render() {
        
       

        return (
           <div className="home-page Wrap">
                <SliderContent />
                <Containert title="51658416532" />
                <Containert />
                <Containert />
                <Containert />
                <Containert />
                <Containert />
                <Containert />
                <SliderSinger />
                <Containert />
                <Containert />
                <Containert />
                <Containert />



           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
