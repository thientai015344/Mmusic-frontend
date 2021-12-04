import React, { Component } from 'react';
import {getDetailAlbum} from '../../services/albumSevice'
import './detailAlbum.scss'
import MediaItem from '../../components/mediaItem';
class PageDetailAlbum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArrayDetail :[],
            id : 3
        }
    }

    iffd = this.props.match.params.id

  
    
    async componentDidMount() {
       
        await this.getDetailAlbum();

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
      let array = this.state.ArrayDetail; 
      console.log('singerfortracksss',array)
      const audioLists = array && array.map(track =>{
        let imageBase64Album = '';
        if(track.imgAlbum){
        
            imageBase64Album = new Buffer(track.imgAlbum, 'base64').toString('binary');
        }
        ////////////////////////////////////////////////////////////////
        let imageBase64trac = '';
        if(track.albumtracks.track.imgsong){
        
            imageBase64trac = new Buffer(track.albumtracks.track.imgsong, 'base64').toString('binary');
        }
      return {nameAlbum: track.nameAlbum,  imgAlbum: imageBase64Album, nametrack : track.albumtracks.track.namesong, imgtrack : imageBase64trac, filetrack : track.albumtracks.track.filetrack, duration : track.albumtracks.track.duration, singerName : track.albumtracks.track.singer.singername, 
    
        
    }
})

console.log('option',audioLists)



        return (

            <>

{audioLists && audioLists.map((item, index) => {

    return (

                        <div className="detailAlbum" key={index}>
                            
                            <div className="album-content">
                                <div className="imgAlbum">
                                    <img src={item.imgAlbum} alt='' />
                                </div>

                                <h1 className="title-Album" >
                                        {item.nameAlbum}
                                </h1>
                            </div>


                            <div className="album-song">
                                <div className="album-title-song">
                                    <span className="album-fist">Bài hát</span>
                                    <span>duration</span>
                                    <span className="album-end">option</span>
                                </div>
                                <div className="album-song-item">
                                    <MediaItem 
                                        imgsong={item.imgtrack}
                                        namesong={item.namesong}
                                        singerName={item.singerName}
                                        duration={item.duration}
                                                />
                                   
                                                
                                </div>
                            </div>

                        </div>



    ) 
    
    
    })


}



            </>
        );
    }
}

export default PageDetailAlbum;