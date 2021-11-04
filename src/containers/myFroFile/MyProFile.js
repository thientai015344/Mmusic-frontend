import React, { Component } from 'react';
import { Link  } from "react-router-dom";
import MyOverview from "./MyOverview"
import './MyProfile.scss'

class MyProFile extends Component {
    render() {
        return (
           
            <div className ="myprofile">
               <div className="profile-default">

                   <div className="profile-avata">
                            <img className="profile-picture--img" src="https://s120-ava-talk.zadn.vn/b/d/c/8/13/120/307d43910eb0bcbb8d6f695fb8ec13e9.jpg" alt="" />
                   </div>

                   <div className="profile-name">
                        Võ Thiên Tài
                   </div>

                   <div className="bar-userProfile">
                        <ul className="content__bar-menu">
                            <li  className="content__bar-item active">
                                <Link to="/myfrofile" >Tổng quan</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/song">Bài hát</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/playlist">Playlist</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/album">Album</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/video">MV</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/artist">Nghệ sĩ</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/upload">Tải lên</Link>
                            </li>
                        </ul>
                    </div>
               </div>

               <div className="container-myprofile">
                
                <MyOverview />

                   </div>
               
                
            </div>

          
        );
    }
}

export default MyProFile;