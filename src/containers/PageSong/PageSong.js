import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem';
import Title from '../../components/Title';

import {getALLTrack} from '../../services/TrackSevice';




class PageSong extends Component {





    constructor(props) {
        super(props);
        this.state = {
            ArrayTrack : [],
        }
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

                                    console.log('fff',item.namesong ),

                                         <MediaItem key={index}
                                          namesong={item.namesong} 
                                          imgsong = {imageBase64}
                                          duration={item.duration}
                                          singername={item.singer.singername} 
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