import React, { Component } from 'react';
import './menu.css';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { NavLink } from "react-router-dom";

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state ={
            status:0,

        }

    }


       

    render() {
        return (
            <>
                <div className="allNavbar">
                   <div className=" Wrap navbar1">
                        <div className=" nav-logo ">
                            <NavLink className="navbar-logo" to="/">
                            <img src="../img/logo/logo.png" alt="" className="img-logo" />
                            </NavLink>
                        </div>  
                        <div className="navbar-list-menu">
                            <ul id="nav-listMenu"> 
                                {/* ///////////////* song * / */}
                                <li className="navbar-li-song">
                                    <NavLink activeclassname="active" className="nav-listMenu--Song " to="/bai-hat">
                                    Bài hát                   
                                    </NavLink>
                                    
                                </li>
                                {/* /* ////////BXH/////////////////// */} 
                                <li className="navbar-li-charts">
                                    <NavLink activeclassname="active" className="nav-listMenu--charts" to="/BXH">
                                    BXH                  
                                    </NavLink>  
                                    
                                </li>
                                {/* collection */} 
                                <li className="navbar-li-collection">
                                    <NavLink activeclassname="active" className="nav-listMenu--collection" to="/tuyen-tap">
                                    Tuyển tập                  
                                    </NavLink>
                                    
                                </li>
                                {/* playlist */} 
                                <li className="navbar-li-playlist">
                                    <NavLink activeclassname="active" className="nav-listMenu--playlist" to="/playlist">
                                            playlist</NavLink>
                                    
                                </li>
                                {/* artist */} 
                                <li activeclassname="active" className="navbar-li-artist">
                                    <NavLink className="nav-listMenu--artist" to="/nghe-si">
                                    Nghệ sĩ                 
                                    </NavLink>   
                                </li>  
                        
                            </ul>
                        </div>     
                        <div className="auto-right">
                            <div className="search">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                                <input type="text" className="search-input" placeholder="Tìm Kiếm" aria-label="Input group example" aria-describedby="basic-addon1" autoComplete="off" />
                            </div>
                            <div className="user-pfrofile">
                                <NavLink to="/myfrofile" className=" frofile ">
                                        <i className="fas fa-user"></i>
                                </NavLink>
                               
                             </div>    
                             
                        </div>
                    </div>    
               
                </div>    
                
            </>
        );
    }
}



export default   (Menu);



