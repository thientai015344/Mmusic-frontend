import React, { Component } from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { connect } from 'react-redux';
import MediaItem from '../components/mediaItem';
import equal from 'fast-deep-equal'
import './PlayerMusic.scss'


  
  class PlayerMusic extends Component {

    
    constructor(props) {
      super(props);
      this.state = {
          ArrayTrack : [],
      }
  }




  // componentDidMount =() => {

  //   let audioLists = this.props.listmusics
  //   console.log('settet',audioLists)
  //   this.setState({
  //     ArrayTrack : audioLists
  //   })
  // }

  componentDidUpdate(prevProps){

    if(prevProps.listmusics !== this.props.listmusics){

      this.setState({          
           ArrayTrack: this.props.listmusics
              });
    }

  }



    render() {


      let audioLists = this.state.ArrayTrack; 
      
      return (
        <>

        <MediaItem
       
        />


        <ReactJkMusicPlayer
        audioLists={audioLists}
     
        autoPlay={true}
        drag={true}
      />
          
        </>
      );
    }
  }


  const mapStateToProps = state => {

    return {

      listmusics : state.music.track

    };

  };

 
  export default connect( mapStateToProps) (PlayerMusic);

  


