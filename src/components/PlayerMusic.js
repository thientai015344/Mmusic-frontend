import React, { Component } from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { connect } from 'react-redux';
import MediaItem from '../components/mediaItem';
import './PlayerMusic.scss'


  
  class PlayerMusic extends Component {

    
    constructor(props) {
      super(props);
      this.state = {
          ArrayTrack : [],
      }
  }




    render() {


      let audioLists = this.props.listmusics; 

      return (
        <>

        <MediaItem
       
        />


        <ReactJkMusicPlayer
        audioLists={audioLists}
        showMediaSession
        autoPlay={true}
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

  


