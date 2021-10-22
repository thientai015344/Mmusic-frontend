import React, { Component } from 'react';
import '../Header/menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from "react-router-dom";

class Menu extends Component {
    constructor(props) {
        super(props)
        this.state ={
            status:0,

        }

    }

     
       

    renderButtonLogin =() =>(  
        <div className="user-loggin">
            <button  className=" btn-login ">Đăng nhập</button>
            <button  className=" btn-regitter ">Đăng ký</button>
        </div>          
    )   

renderUser =() =>(  
    <div className="use-user">
        <div className="user-picture">
            <FontAwesomeIcon icon ={faUser}  /> 
            <div className="user-logout">
                <ul>
                    <li className="item-proflie">
                    <NavLink to="#/" className="profile">Trang cá nhân</NavLink>
                    </li>
                    <li className="item-logout">
                    <NavLink to="#/" className="logout">Đăng Xuất</NavLink>
                    </li>
                </ul>
            </div>
        </div>  
    </div>                
)

displaycheck =() =>{
    if(this.state.status === 0){
        return this.renderButtonLogin();
        
    }
    else{

        return this.renderUser();
    }
}

changeiconButton =() =>{
    if(this.state.status === 0){
        
        this.setState({status: 1})
    }
    else{
        this.setState({status: 0})
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
                            <li activeclassname="active" className="navbar-li-artist">
                                <NavLink className="nav-listMenu--artist" to="/user">
                                User                
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
                            <div className="user-loggin">
                                <NavLink to="#/" className=" btn-login ">Đăng nhập</NavLink>
                               
                             </div>    
                        </div>
                    </div>    
               
                </div>    
                
            </>
        );
    }
}

export default Menu;

