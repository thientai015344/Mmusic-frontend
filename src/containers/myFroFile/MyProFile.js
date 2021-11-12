import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link  } from "react-router-dom";
import MyOverview from "./MyOverview"
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import MySong from "./MySong"
import './MyProfile.scss'

class MyProFile extends Component {
    render() {
        const { processLogout } = this.props;
        return (


            <BrowserRouter>
            <Switch>
              <Route exact path="/myfrofile" component={<MyOverview />}/>
              <Route exact path="/myfrofile/library/song" component={<MySong />}/>
           

                
            </Switch>
          </BrowserRouter>,
           
            <div className ="myprofile">
               <div className="profile-default">
                   <div className="profile-setting">
                    <i class="fas fa-user-cog"></i>
                    <div className="sub-setting">
                        <button className="btn-setting--edit"> Chỉnh Sửa</button>
                        <button className="btn-setting--lockout" onClick={processLogout} > Đăng Xuất</button>
                    </div>
                   </div>



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

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default (connect(mapStateToProps, mapDispatchToProps) (MyProFile));