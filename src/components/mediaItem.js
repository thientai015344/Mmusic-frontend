import './mediaItem.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faLink, faDownload, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import * as actions from '../store/actions'


class MediaItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            status:0
        }

    }

    renderButtonPlay =() =>(  
            <FontAwesomeIcon icon ={faPause}  />           
    )

    renderButtonPause =() =>(  
            <FontAwesomeIcon icon ={faPlay}  />                
    )

    displaycheck =() =>{
        if(this.state.status === 0){
            
            return this.renderButtonPause();
        }
        else{
          
            return this.renderButtonPlay();
        }
    }

    changeiconButton =(track) =>{
        this.props.getTrackfrompageSong(track)
///////////////////////////////////////////////////////

        if(this.state.status === 0){
            
            this.setState({status: 1})
        }
        else{
            this.setState({status: 0})
        }
       
    }

    getTrackforPlayer =() =>{
        this.props.getTrackforPlayer();
    }





    render() {
        let array = this.props.getarray
        return (
            <div key={this.props.id} className="Wrap width">
                <div className="list-item-media  ">
                <div className="media-overlay--background"></div> 
                    <div className="item-media">
                        <div className="media-left">
                            <div className="media-picture">
                                <img className="media-picture--img" src={this.props.imgsong}  alt=""/>
                                <div className="media-overlay">
                                    <button className="mediasong-icon" onClick={() => this.changeiconButton(array)} >
                                        {this.displaycheck()}
                                    </button>
                                </div> 
                            </div>                   
                            <div className="decription">
                                <div className="song-name">
                                 {this.props.namesong}
                                </div>
                                <a href={"/singer/" + this.props.singerName + ".html"} className="singer-name">
                                    {this.props.singerName}
                                </a>
                            </div>

                        </div>
                        <div className="media-duration">
                    {this.props.duration}
                        </div>
                        <div className="media-right">
                            <div className="media-icon">
                                <button className="addplaylist" onClick={() => this.changeiconButton()} >
                                    <FontAwesomeIcon icon ={faHeart  } />
                                </button>
                                <button className="copylink" onClick={() => this.changeiconButton()} >
                                <FontAwesomeIcon icon ={faLink } />
                                </button>
                                <button className="dowload" onClick={() => this.changeiconButton()} >
                                <FontAwesomeIcon icon ={faDownload} />
                                </button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackfrompageSong : (listtrack) => dispatch(actions.getTrack(listtrack))
    };
};

export default connect( null, mapDispatchToProps)(MediaItem);