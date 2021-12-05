import React, { Component } from 'react'
import './ingerItem.scss'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'







 class SingerItem extends Component {
    constructor(props) {
        super(props)
        

    }

 
    render() {
        let id = this.props.id    
        return (
   
            <>
            
                <div className="music-item"  >
                        
                    <NavLink to = {`/singer/${id}`} title={this.props.singername} className="music-picture">
                            <div  className="music-picture--link">
                                <img className="music-picture--img" src={this.props.img} alt=""/>
                            </div> 
                            
                    </NavLink> 
                    
                    <div className="contet-playlist">
                        <NavLink to = {`/singer/${id}`} className="music_name">
                          {this.props.singername}
                        </NavLink>
                        
                </div>
                   

                </div>
                
            </>
        )
           
    }
       
   
}

 export default withRouter(SingerItem );
