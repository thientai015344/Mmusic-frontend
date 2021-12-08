import React, { Component } from 'react';
import './profilesinger.scss';
import Title from './Title';
import {getALLSinger, getDetailSinger} from '../services/singerSevice';
import MediaItem from './mediaItem'
class Profilesinger extends Component {

    constructor(props) {

        super(props);

        this.state = {
            ArraySinger : {},
            ArraytrackSinger : []
        }
    }

    async componentDidMount() {
       
        await this.getALLSinger();


        await this.getDetailSinger();
       

    }

    getALLSinger = async() =>{
        let fff = this.props.match.params.id
        let response = await getALLSinger(fff)
        if(response && response.errCode === 0) {
            let singers =response.singer;
            this.setState ({ 
                ArraySinger : singers
                 
             })
             
        }
    }

    getDetailSinger = async() =>{
        let fff = this.props.match.params.id
        let response = await getDetailSinger(fff)
        if(response && response.errCode === 0) {
            let tracs =response.track.reverse();
            this.setState ({ 
                ArraytrackSinger : tracs
                 
             })
             
        }
    }




    render() {
        let singers = this.state.ArraySinger
            let imageBase649 = '';
                if(singers.avatasinger){
                
                    imageBase649 = new Buffer(singers.avatasinger, 'base64').toString('binary');
                }
        
        let tracs = this.state.ArraytrackSinger    

        const audioLists = tracs && tracs.map(track =>{
       
            let imageBase64trac = '';
            if(track.tracks.imgsong){
            
                imageBase64trac = new Buffer(track.tracks.imgsong, 'base64').toString('binary');
            }
        return { id : track.tracks.id, idsinger:track.tracks.singerId,musicSrc: track.tracks.filetrack , name : track.tracks.namesong, cover : imageBase64trac, duration : track.tracks.duration, singer : track.singername}

        })
        
     
    
    
        return (
            <>
            <div className="profile-background ">
                <div className="profile-top">
                    <div className="profile-content col-7" >
                        <h1 className="profile-Name"  >{singers.singername}</h1>
                        <p className="profile-story">
                             {singers.description}
                        </p>
                    </div>

                    <div className="profile-img col-4">

                        <img src={imageBase649} alt="" className="img-avata" />

                    </div>
                </div>

                <div className="profile-singer-song" >
                    <Title title="Bài Hát Nỗi bật" />

                    {audioLists && audioLists.map((item, index) => {


                            return(

                            

                                    <MediaItem 
                                    //gettrackkk = {() => this.getTrackforPlayer()}
                                    key={index}
                                    namesong={item.name} 
                                    imgsong = {item.cover}
                                    duration={item.duration}
                                    idsinger={item.idsinger}
                                    id ={item.id}
                                    singername={item.singer} 
                                    getarray ={audioLists}
                                        />
                            
                                )

                        })
                    }
                </div>



    </div>

           

                
            </>
        );
    }
}

export default Profilesinger;