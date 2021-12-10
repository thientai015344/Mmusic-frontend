import React, { Component } from 'react';
import  {getDetailAlbum, getALLAlbum} from '../../services/albumSevice'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import './detailAlbum.scss'
import MediaItem from '../../components/mediaItem';
class PageDetailAlbum extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            value: '',
            ArrayDetail :[],
            Album : {},           
            imgAlbum :'',
            
            
           
        }
    }

    iffd = this.props.match.params.id

  
   

    async componentDidMount() {

        

        await this.getALLAlbum(); 

        await this.getDetailAlbum();

        let Album = this.state.Album;
      
            document.title = 'Album || ' + Album.nameAlbum
            let imageBase64 = '';
            if(Album.imgAlbum){
               
                imageBase64 = new Buffer(Album.imgAlbum, 'base64').toString('binary');
            }

            this.setState({
                
                imgAlbum : imageBase64
            })
        
        

    }

    getALLAlbum = async() =>{
        let fff = this.props.match.params.id
        let response = await getALLAlbum(fff)        
        if(response && response.errCode === 0) {       
            let albums =response.album;
           
            this.setState ({ 
            Album : albums
             })
             
        }
    }


    getDetailAlbum = async() =>{
        let idd = this.props.match.params.id
        let response = await getDetailAlbum(idd)
        if(response && response.errCode === 0) {
            let details =response.detailAlbum.reverse();
      
            this.setState ({ 
                ArrayDetail : details
                 
             })
             
        }
    }


    handlCopy= async() => {
        let url = window.location.href

        await navigator.clipboard.writeText(url)

        toast.info('Link đã được sao chép vào clipboard')
    }



    render() {   

        let Album = this.state.Album


      let array = this.state.ArrayDetail; 
  
      const audioLists = array && array.map(track =>{
       
        let imageBase64trac = '';
        if(track.albumtracks.track.imgsong){
        
            imageBase64trac = new Buffer(track.albumtracks.track.imgsong, 'base64').toString('binary');
        }
      return {id : track.albumtracks.track.id ,name : track.albumtracks.track.namesong ,idsinger : track.albumtracks.track.singerId, cover : imageBase64trac, musicSrc : track.albumtracks.track.filetrack, duration : track.albumtracks.track.duration, singer : track.albumtracks.track.singer.singername }
    })






    
        return (

            <>


                        <div className="detailAlbum" >
                            
                            <div className="album-content">
                                <div className="imgAlbum">
                                    <img src={this.state.imgAlbum} alt='' className="img-Album" />
                                </div>

                                <h1 className="title-Album" >
                                        {Album.nameAlbum}
                                </h1>
                                <div className="button-search">

                                    <button className="share-clapboard" onClick={ () =>this.handlCopy()}>
                                        <FontAwesomeIcon icon ={faLink } />
                                    </button>

                                </div>
                            </div>


                            <div className="album-song">
                                <div className="album-title-song">
                                    <span className="album-fist">Bài hát</span>
                                    <span>duration</span>
                                    <span className="album-end">option</span>
                                </div>
                                <div className="album-song-item">

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

export default PageDetailAlbum;