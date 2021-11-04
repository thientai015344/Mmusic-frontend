import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem'
import Title from '../../components/Title';
import PlaylistItem from '../../components/playlistItem'
import { NavLink  } from "react-router-dom";
import "./MyOverview.scss"


class MyOverview extends Component {
    render() {
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