import React, { Component } from 'react'
import './playlistItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPause, faPlay} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'







 class Myplaylist extends Component {
    constructor(props) {
        super(props)
        this.state ={
            status:0,
            playlistId : '',
            
        }

    }

    componentDidMount =() =>{
        let id = this.props.id
        this.setState({
            playlistId : id
        })
    }

 

    renderButtonPlay =() =>(  
            <FontAwesomeIcon icon ={faPause}  />           
    )

    renderButtonPause =() =>(  
            <FontAwesomeIcon icon ={faPlay}  />                
    )

    displaycheck =() =>{
        if(this.state.status === 0){
            
            return this.renderButtonPause();
        }
        else{
          
            return this.renderButtonPlay();
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

    handleEdit =() =>{
        alert('click me')
    }


    handleDelete = async () => {

        this.props.handleDelete(this.state.playlistId)
    }

   
  
 

    render() {
        return (
   
            <> 
            
                <div className="music-item" >
                        
                    <div className="music-picture">
                            <div  className="music-picture--link">
                                <img className="music-picture--img" src={ this.props.img == null  ? "https://image.shutterstock.com/image-vector/playlist-handdrawn-concept-on-beige-260nw-1657857751.jpg" : this.props.img} alt=""/>
                            </div> 
                            <div   className="music-overlay">
                                <div className="music-overlay-item--sub">

                                    <button className="setting-icon" title="chỉnh sửa Playlist" >
                                            <i className="fas fa-wrench"/>
                                    </button>   
                                    <div className="sub-setting">
                                        <button className="btn-setting--edit" onClick = {() =>this.handleEdit()} > Chỉnh Sửa</button>
                                        <button className="btn-setting--lockout" onClick = {() =>{this.handleDelete()}}  > Xóa Playlist</button>
                                    </div>

                                </div>
                                <NavLink to ={`/playlist/${this.props.id}`} className="icon-playlist" onClick={() => this.changeiconButton()} >
                                    {this.displaycheck()}
                                </NavLink>
                            </div>
                    </div> 
                    
                    <div className="contet-playlist">
                        <NavLink to ={`/playlist/${this.props.id }`} className="music_name">
                          {this.props.name}
                        </NavLink>

                                         
                    </div>
                   

                </div>
                
            </>
        )
           
    }
       
   
}

 export default withRouter(Myplaylist );
