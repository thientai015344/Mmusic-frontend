import './mediaItem.css';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart, faLink, faComment, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import _ from 'lodash';
import * as actions from '../store/actions'
import { toast } from 'react-toastify';
import {emitter} from '../utils/emitter'
import ModalcreatePlaylist from '../containers/myFroFile/modalcreatePlaylist'
import {createNewTrackPlaylist, createNewPlaylist, createNewTracklibrytracks, getALLPlaylist } from '../services/playlistSevice';
import ModalComment from './modacommettrack'

class MediaItem extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isOpenModalcommet : false, 
            userId : '',
            trackId : '',
            status:0,
            isOpenModalAlbum : false, 
            arraycomment: [],
            ArrayPlaylist: [],

        }

    }

    async componentDidMount() {
  

    
        let {userinfor} = this.props;
        let user = userinfor;
        if(user && !_.isEmpty(user)){
            let id = user.id
            this.setState({
                userId : id
            })
            let response = await getALLPlaylist(id)
            if(response && response.errCode === 0) {
                let playlists = response.playlist.data.reverse();
                this.setState ({ 
                    ArrayPlaylist : playlists
                })
     
            }
    
        }
   
        await this.getALLPlaylist();

    
    }


    getALLPlaylist = async() =>{
        let id = this.state.userId
        let response = await getALLPlaylist(id)
        if(response && response.errCode === 0) {
            let playlists = response.playlist.data.reverse();
            this.setState ({ 
                ArrayPlaylist : playlists
             })
             
        }
    }




    handleaddtracklib = async(id) =>{
        await createNewTracklibrytracks({
            trackId : id,
            userId : this.state.userId,
        })
        toast.success('đã thêm vào thư viện'); 
    }

    setTRackId=(id) =>{
        this.setState({
            trackId : id,
        })
    }


    handleAddTrackPlaylist= async(id) =>{
        await createNewTrackPlaylist({
            playlistId : id,
            trackId : this.state.trackId,
        })
        toast.success('đã thêm vào Playlist'); 
            
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
        this.setState ({
            isOpenModalcommet : true,
            
        })

       

    }

    toggleAlbumModal = () =>{

        this.setState({isOpenModalAlbum : !this.state.isOpenModalAlbum, })
 
     }

    
    createNewPlaylist = async (data) =>{
        console.log('check data',)
        try {
           let response = await createNewPlaylist(
               {
                playlistname : data.playlistname,
                imgplaylist :data.imgplaylist,
                userId :this.state.userId
                
            });
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getALLPlaylist();
               this.setState({
                isOpenModalAlbum : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ tạo playlist success ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleAddNewAlbum = () =>{

        this.setState({
            isOpenModalAlbum :true,
        })

    }






    render() {
        let array = this.props.getarray
        console.log(array)
        let id = this.props.id


        let playlist = this.state.ArrayPlaylist
       
        return (


            <>
                <ModalComment 

                 isOpen={this.state.isOpenModalcommet}
                    toggleFromParent = {this.toggleCommentModal}
                    id = {id}
                
                />

                
                <ModalcreatePlaylist
                    
                    isOpen={this.state.isOpenModalAlbum}
                    toggleFromParent = {this.toggleAlbumModal}
                    createNewAlbum = {this.createNewPlaylist}
               
                    
                
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
                                    <div className="media-addTrack">
                                        <button className="addplaylist" onClick={() => this.setTRackId(this.props.id)} >
                                            <FontAwesomeIcon icon ={faHeart  } />
                                        </button>
                                        <ul className="media-lits--option">
                                            <button className="media-item--addTrackLib" onClick={() => this.handleaddtracklib(this.props.id)}> thêm vào thư viện</button>
                                            <button className="media-item--addTrackforPlaylist" > thêm vào Playlist
                                                <div className="media-getPlaylist">
                                                    <button className="media-createPlaylist" onClick ={() => this.handleAddNewAlbum()} ><div className="media-iconCreatePlaylist"> <i className="fas fa-plus"></i></div> Tạo Playlist Mới</button>
                                                    <ul className="media-listPlaylist">
                                                    {playlist && playlist.map((item, index) => {

                                                        return( 

                                                            <li className="media-listPlaylist-item" onClick={() => this.handleAddTrackPlaylist(item.playlists.id)}  key={index}>
                                                                <button className="create-track--playlist"  ><i className="fas fa-list">{item.playlists.playlistname}</i></button>
                                                            </li>

                                                            )   
                                                        })
                                                    }
                                                    </ul>
                                                </div>
                                            </button>
                                        </ul>
                                    </div>
                                    <button className="copylink" onClick={() => this.changeiconButton()} >
                                    <FontAwesomeIcon icon ={faLink } />
                                    </button>
                                    <button className="comment-icon" onClick={() => this.comment(id)} >
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
const mapStateToProps = state => {
    return {

        userinfor : state.user.userInfo,

        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrackfrompageSong : (listtrack) => dispatch(actions.getTrack(listtrack)),

        getIdSong : (idtrack) => dispatch(actions.getIdTrack(idtrack))

    };
};

export default connect( mapStateToProps, mapDispatchToProps)(MediaItem);