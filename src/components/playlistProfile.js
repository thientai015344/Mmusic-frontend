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
            status:0
            
        }

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

   
  
 

    render() {
          
        return (
   
            <> 
            
                <div className="music-item" >
                        
                    <div className="music-picture">
                            <div  className="music-picture--link">
                                <img className="music-picture--img" src={this.props.img} alt=""/>
                            </div> 
                            <NavLink to ={`/playlist/${this.props.id}`}  className="music-overlay">
                                <button className="icon" onClick={() => this.changeiconButton()} >
                                    {this.displaycheck()}
                                </button>
                            </NavLink>
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
