import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem'
import Title from '../../components/Title';
import PlaylistItem from '../../components/playlistItem'
import {getALLPlaylist} from '../../services/playlistSevice'
import _ from 'lodash';
import { NavLink  } from "react-router-dom";
import "./MyOverview.scss"


class MyOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',          
            ArrayPlaylist : {},
            isOpenModalEditUserAdm : false, 
            userEdit : {}
            

        }
    }


    async componentDidMount() {  

        await this.getALLPlaylist();


    }

    getALLPlaylist = async() =>{
        let id = this.props.userId
         let response = await getALLPlaylist(id)
         
         if(response && response.errCode === 0) {       
             let playlists = response.playlist.data.reverse();
             console.log('>>>> check data playlists',playlists)
             this.setState ({ 
                 ArrayPlaylist : playlists
              })
              
         }
     }

    async componentDidUpdate(prevProps){

        if(prevProps.userId !== this.props.userId){
    
            let user = this.props.userId;
                
                if(user && !_.isEmpty(user)){
                    
                    this.setState ({ 
                        ArrayPlaylist : user
                    })
                            
                        
                                
                }

        }

    }


  


    render() {
        let data = this.state.ArrayPlaylist

        console.log('>>>> check data playlists render',data)

        return (
            <div className="myplayList-overview" >
                   <Title title='Bài Hát' />
                <div className="overview-song">


                   <MediaItem />
                   <MediaItem />
                   <MediaItem />
                   <MediaItem />
                   <MediaItem />

                </div>
                    <Title title='PlayList' />
                        <div className="overview-playlist">
                            <div className="createPlaylist">
                                <div className="createPlaylist-content">

                                    <i className="fas fa-plus"></i>
                                    <div className="titel-createPlaylist">
                                        Tạo Playlist Mới
                                    </div>

                                </div>
                            </div>
                                <PlaylistItem />
                                <PlaylistItem />
                                <PlaylistItem />
                                <PlaylistItem />
                                <PlaylistItem />
                                
                                <PlaylistItem />
                                <PlaylistItem />

                        </div>

                <div className="overview-Singer">
                    <div className="overview-Singer--care">
                        <img className="overview-Singer--img" src="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/0/2/d/002d7bc760a3eabf5725e70797e8ac9f.jpg"   alt="" />
                        <NavLink className="name-singer--profile" style={{display: "block", textAlign: "center"}} to="https://zingmp3.vn/NgoKienHuy" >Ngô Kiên Huy</NavLink>
                        <p >169k quan tâm</p>
                        <button className ><i class="fas fa-check"></i> Đã Quan Tâm</button>

                    </div>

                </div>
                
            </div>
        );
    }
}

export default MyOverview;