import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem';
import Title from '../../components/Title';

import {getALLTrack} from '../../services/TrackSevice';




class PageSong extends Component {





    constructor(props) {
        super(props);
        this.state = {
            ArrayAlbum : [],
            getarray : []
        }
    }

    getTrackforPlayer = () =>{

       

        alert('click mee')

      }



    async componentDidMount() {
       
        await this.getALLTrack();

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

        let trackAray = this.state.ArrayTrack; 
        console.log('singerfortracksss',trackAray)
        const audioLists = trackAray && trackAray.map(track =>{
          let imageBase64 = '';
          if(track.imgsong){
          
              imageBase64 = new Buffer(track.imgsong, 'base64').toString('binary');
          }
        return {name: track.namesong, cover: imageBase64, musicSrc : track.filetrack, singer : track.singer.singername}
        })

        


        return (
            <>


               <div className="Marding-60">
                <Title title=" Bài Hát"  />


                {ArrayTrack && ArrayTrack.map((item, index) => {

                            console.log('singer',item.singer.singername)
                            let imageBase64 = '';
                                        if(item.imgsong){
                                        
                                            imageBase64 = new Buffer(item.imgsong, 'base64').toString('binary');
                                        }


                        


                                 return(

                                 

                                         <MediaItem 
                                         gettrackkk = {() => this.getTrackforPlayer()}
                                         key={index}
                                          namesong={item.namesong} 
                                          imgsong = {imageBase64}
                                          duration={item.duration}
                                          singername={item.singer.singername} 
                                          getarray ={audioLists}
                                            />
                                   
                                    )

                                })
                            }
         

                



               </div>

          
            

            </>
        );
    }
}

export default PageSong;