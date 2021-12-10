import React, { Component } from 'react';
import './detailPlaylist.scss'
import MediaItem from '../../components/mediaItem'
import {getALLPlaylistForDetail, getDetailPlaylist} from '../../services/playlistSevice'
import _ from 'lodash';

class PageDetailPlaylist extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            ArrayDetail :[],
            Playlist : {},  
            imgplaylist :'',
            
            
           
        }
    }

    iffd = this.props.match.params.id

  
   

    async componentDidMount() {
       
       

        await this.getALLPlaylistForDetail(); 

        await this.getDetailPlaylist();

        let Playlist = this.state.Playlist;
            let imageBase64 = '';
            if(Playlist.imgplaylist){              
                imageBase64 = new Buffer(Playlist.imgplaylist, 'base64').toString('binary');
            }
            this.setState({       
                imgplaylist : imageBase64
            })
        
            document.title = ' PlayList  | ' + Playlist.playlistname
        

    }

    getALLPlaylistForDetail = async() =>{
        let fff = this.props.match.params.id
        let response = await getALLPlaylistForDetail(fff)        
        if(response && response.errCode === 0) {       
            let playlists =response.playlist.data;
           
            this.setState ({ 
            Playlist : playlists
             })
             
        }
    }


    getDetailPlaylist = async() =>{
        let idd = this.props.match.params.id
        let response = await getDetailPlaylist(idd)
        if(response && response.errCode === 0) {
            let details =response.playlist.reverse();
          
            this.setState ({ 
                ArrayDetail : details
                 
             })
             
        }
    }




    render() {   

        let Playlist = this.state.Playlist
        let name = Playlist.user
            let nameee ='';
        if(name && !_.isEmpty(name)){
            nameee = name.interfaceName

            
    
        }

        


      let array = this.state.ArrayDetail; 
  
      const audioLists = array && array.map(track =>{
       
        let imageBase64trac = '';
        if(track.playlisttracks.track.imgsong){
        
            imageBase64trac = new Buffer(track.playlisttracks.track.imgsong, 'base64').toString('binary');
        }
      return {id : track.playlisttracks.track.id ,name : track.playlisttracks.track.namesong ,idsinger : track.playlisttracks.track.singerId, cover : imageBase64trac, musicSrc : track.playlisttracks.track.filetrack, duration : track.playlisttracks.track.duration, singer : track.playlisttracks.track.singer.singername }
    })


        return (

            <>


                        <div className="detailPlaylist" >
                            
                            <div className="Playlist-content">
                                <div className="imgplaylist">
                                    <img src={this.state.imgplaylist} alt='' className="img-Playlist" />
                                </div>

                                <h1 className="title-Playlist" >
                                        {Playlist.playlistname}
                                </h1>

                                <p className="create-by">Tạo bởi : {'_', nameee}</p>
                            </div>


                            <div className="Playlist-song">
                                <div className="Playlist-title-song">
                                    <span className="Playlist-fist">Bài hát</span>
                                    <span>duration</span>
                                    <span className="Playlist-end">option</span>
                                </div>
                                <div className="Playlist-song-item">

                                    {audioLists && audioLists.map((item, index) => {

                                        return (
                                                <MediaItem
                                                tem 
                                                        key={index}
                                                    imgsong={item.cover}
                                                    id ={item.id}
                                                    idsinger ={item.idsinger}
                                                    namesong={item.name}
                                                    singername={item.singer}
                                                    duration={item.duration}
                                                    getarray ={audioLists}

                                                            />
                                   
                                                                                            
                                                )                                                
                                            }   
                                        )
                                     }
                                </div>
                            </div>

                        </div>






            </>
        );
    }
}

export default PageDetailPlaylist;