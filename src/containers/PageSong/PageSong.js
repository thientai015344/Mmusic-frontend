import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem';
import Title from '../../components/Title';

import {getALLTrack} from '../../services/TrackSevice';




class PageSong extends Component {





    constructor(props) {
        super(props);
        this.state = {
            ArrayTrack : [],
            getarray : []
        }
    }

    getTrackforPlayer = () =>{

       

        alert('click mee')

      }



    async componentDidMount() {

    
       document.title = ' Mmusic || Bài Hát '
       
        await this.getALLTrack();

    }

    getALLTrack = async() =>{
        let response = await getALLTrack('ALL')
        if(response && response.errCode === 0) {
            let tracks =response.track;
            this.setState ({ 
                ArrayTrack : tracks
                 
             })
             
        }
    }


   





    render() {
        let ArrayTrack = this.state.ArrayTrack;

        let trackAray = this.state.ArrayTrack; 
       
        const audioLists = trackAray && trackAray.map(track =>{
          let imageBase64 = '';
          if(track.imgsong){
          
              imageBase64 = new Buffer(track.imgsong, 'base64').toString('binary');
          }
        return { name: track.namesong, cover: imageBase64, musicSrc : track.filetrack, singer : track.singer.singername}
        })

     


        return (
            <>


               <div className="Marding-60">
                <Title title=" Bài Hát"  />


                {ArrayTrack && ArrayTrack.map((item, index) => {

                         
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
                                          idsinger={item.singerId}
                                          id={item.id}
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