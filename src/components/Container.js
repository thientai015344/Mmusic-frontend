
import './Container.css';
import React, { Component } from 'react'
import PlaylistItem from './playlistItem.js';
import Title from './Title.js';



export default class Container extends Component {


    
    render() {


        return (

            <div>
                <div className="playlistItem">

                    <Title />
                    
                    <div className="containerList">
                        <PlaylistItem />
                        <PlaylistItem />
                        <PlaylistItem />
                        <PlaylistItem />
                        <PlaylistItem />
                   
                    </div>

                </div>
                
            </div>    
            
        )
    }
}

