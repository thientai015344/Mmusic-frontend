import React, { Component } from 'react';
import PlaylistItem from '../../components/playlistItem';
import Title from '../../components/Title';
import {getALLAlbum} from '../../services/albumSevice'
import './pageAlbum.scss'
class PageAlbum extends Component {





    constructor(props) {
        super(props);
        this.state = {
            ArrayAlbum : [],
        }
    }


    async componentDidMount() {
       
        await this.getALLAlbum();

    }

    getALLAlbum = async() =>{
        let response = await getALLAlbum('ALL')
        if(response && response.errCode === 0) {
            let albums =response.album.reverse();
            this.setState ({ 
                ArrayAlbum : albums
                 
             })
             
        }
    }


   





    render() {

        
        let albumAray = this.state.ArrayAlbum; 
        const audioLists = albumAray && albumAray.map(album =>{
          let imageBase64 = '';
          if(album.imgAlbum){
          
              imageBase64 = new Buffer(album.imgAlbum, 'base64').toString('binary');
          }
        return {name: album.nameAlbum, cover:imageBase64, id: album.id }
        })



        


        return (
            <>


               <div className="Marding-60">
                <Title title=" Album moi nhat"  />
                <div className="Marding-item Wrap">

                {audioLists && audioLists.map((item, index) => {

                        return(

                                <PlaylistItem    
                                key={index}
                                id ={item.id}
                                name={item.name} 
                                img={item.cover}
                               
                               
                                //getarray ={audioLists}
                                />
                        
                        )

                    })
                }
                </div>



                



               </div>

          
            

            </>
        );
    }
}

export default PageAlbum;