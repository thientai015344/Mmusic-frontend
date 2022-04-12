import React, { Component } from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { connect } from 'react-redux';
import MediaItem from '../components/mediaItem';
import {Player} from "webvtt-player"
import './PlayerMusic.scss'


  
  class PlayerMusic extends Component {

    
    constructor(props) {
      super(props);
      this.state = {
          ArrayTrack : [],
      }
  }


  componentDidUpdate(prevProps){

    if(prevProps.listmusics !== this.props.listmusics){

      this.setState({          
           ArrayTrack: this.props.listmusics
              });
    }

  }



    render() {


      let audioLists = this.state.ArrayTrack; 
      console.log('lyric',audioLists);
      return (
        <>

        <MediaItem
       
        />

        


        <ReactJkMusicPlayer
        audioLists={audioLists}
        showLyric={true}
        autoPlay={true}
        drag={true}
        
      />
      {/* <Player
  audio='http://res.cloudinary.com/thientai/video/upload/v1649656840/fileaudio/otdoyl0wtua5upvx919h.mp3'
  transcript="https://example.org/transcript.vtt" /> */}


          
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

  


