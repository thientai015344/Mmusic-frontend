import './mediaItem.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faLink, faComment, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions'
import ModalComment from './modacommettrack'

class MediaItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isOpenModalcommet : false, 
            trackId : '',
            status:0,
            arraycomment: [],
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

    toggleCommentModal = () =>{

        this.setState({isOpenModalcommet : !this.state.isOpenModalcommet, })
 
     }
 

    comment = (idd) =>{
        this.props.getIdSong(idd)
        console.log('commentwwwwwwwwwwww', idd)
        this.setState ({
            isOpenModalcommet : true,
            
        })

       

    }






    render() {
        let array = this.props.getarray
        let id = this.props.id
       
        return (


            <>
                <ModalComment 

                 isOpen={this.state.isOpenModalcommet}
                    toggleFromParent = {this.toggleCommentModal}
                    id = {id}
                
                />


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
                                    <NavLink to={`/singer/${this.props.idsinger}`} className="singer-name">
                                        {this.props.singername}
                                    </NavLink>
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
                                    <button className="dowload" onClick={() => this.comment(id)} >
                                    <FontAwesomeIcon icon ={faComment} />
                                    </button>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackfrompageSong : (listtrack) => dispatch(actions.getTrack(listtrack)),

        getIdSong : (idtrack) => dispatch(actions.getIdTrack(idtrack))

    };
};

export default connect( null, mapDispatchToProps)(MediaItem);