import React, { Component } from 'react';
import  {getDetailAlbum, getALLAlbum} from '../../services/albumSevice'

import './detailAlbum.scss'
import MediaItem from '../../components/mediaItem';
class PageDetailAlbum extends Component {
    constructor(props) {
        super(props); 
        this.state = {
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
            console.log('>>>> check data Alibum',albums)
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
            console.log('details', details)
            this.setState ({ 
                ArrayDetail : details
                 
             })
             
        }
    }




    render() {   

        let Album = this.state.Album

        console.log('albummmname', Album.nameAlbum)

       



        




      let array = this.state.ArrayDetail; 
      console.log('singerfortracksss',array)
      const audioLists = array && array.map(track =>{
       
        let imageBase64trac = '';
        if(track.albumtracks.track.imgsong){
        
            imageBase64trac = new Buffer(track.albumtracks.track.imgsong, 'base64').toString('binary');
        }
      return {nametrack : track.albumtracks.track.namesong, imgtrack : imageBase64trac, filetrack : track.albumtracks.track.filetrack, duration : track.albumtracks.track.duration, singerName : track.albumtracks.track.singer.singername, 
    
        
    }
})




console.log('audiolists', audioLists)

    
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
                                                        key={index}
                                                    imgsong={item.imgtrack}
                                                    namesong={item.nametrack}
                                                    singerName={item.singerName}
                                                    duration={item.duration}
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