import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Homepage.scss'
import Title from '../../components/Title';
import PlaylistItem from '../../components/playlistItem';
import {getALLAlbum} from '../../services/albumSevice'
import SliderContent from '../slider/SliderContent'
import SliderSinger from '../slider/SliderSinger';
import MediaItem from '../../components/mediaItem';
import {getALLTrack} from '../../services/TrackSevice';




class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ArrayAlbum : [],
            ArrayTrack: [],
        }
    }

    
    async componentDidMount() {
       
        await this.getALLAlbum();
        await this.getALLTrack();

    }

    getALLAlbum = async() =>{
        let response = await getALLAlbum('ALL')
        if(response && response.errCode === 0) {
            let albums =response.album.reverse();
            this.setState ({ 
                ArrayAlbum : albums
                 
             })
             
        }
    }

    getALLTrack = async() =>{
        let response = await getALLTrack('ALL')
        if(response && response.errCode === 0) {
            let tracks =response.track.reverse();
            this.setState ({ 
                ArrayTrack : tracks
                 
             })
             
        }
    }

    render() {

        let ArrayTrack = this.state.ArrayTrack;
///////////////////////////////////////////////////////////////////////////
        let trackAray = this.state.ArrayTrack; 
       
        const audioLists = trackAray && trackAray.slice(0, 10).map(track =>{
          let imageBase64 = '';
          if(track.imgsong){
          
              imageBase64 = new Buffer(track.imgsong, 'base64').toString('binary');
          }
        return { name: track.namesong, cover: imageBase64, musicSrc : track.filetrack, singer : track.singer.singername}
        })

       

/////////////////////////////////////////////////////////////////////////////////
        
        let albumAray = this.state.ArrayAlbum; 
        const albumLists = albumAray && albumAray.map(album =>{
          let imageBase64 = '';
          if(album.imgAlbum){
          
              imageBase64 = new Buffer(album.imgAlbum, 'base64').toString('binary');
          }
        return { name: album.nameAlbum, cover:imageBase64, id: album.id }
        })
    

        return (
            <div className="homeallPage">
           <div className="home-page ">
                <SliderContent />
                <Title  title ="ALBUM MỚI NHẤT"/>

                <div className="home-album">
                    {albumLists && albumLists.slice(0, 10).map((item, index) => {

                        

                        return(
                                
                                <PlaylistItem   

                                    key={index}
                                    id ={item.id}
                                    name={item.name} 
                                    img={item.cover}
                                    />

                        )

                        })
                    }
                </div>

                <SliderSinger />
               
                <Title title='Bài Hát Mới Nhất' />
               <div className="home-song">

                {ArrayTrack && ArrayTrack.slice(0, 10).map((item, index) => {

                    let imageBase64 = '';
                    if(item.imgsong){
                    
                        imageBase64 = new Buffer(item.imgsong, 'base64').toString('binary');
                    }
            
                        return(
                                
                            <MediaItem 
                            gettrackkk = {() => this.getTrackforPlayer()}
                            key={index}
                            id={item.id}
                            namesong={item.namesong} 
                            imgsong = {imageBase64}
                            duration={item.duration}
                            idsinger={item.singerId}
                            singername={item.singer.singername} 
                            getarray ={audioLists}
                                />
        
                        )

                    })
                }

               </div>

           </div>
              {/* //  <Footer /> */}

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
