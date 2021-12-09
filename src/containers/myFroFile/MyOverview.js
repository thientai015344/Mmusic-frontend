import React, { Component } from 'react';
import MediaItem from '../../components/mediaItem'
import Title from '../../components/Title';
import Myplaylist from '../../components/playlistProfile'
import { toast } from 'react-toastify';
import {emitter} from '../../utils/emitter'
import {getALLPlaylist, GetAlllibrytracks, createNewPlaylist, editPlaylist, deletePlaylist} from '../../services/playlistSevice'
import { connect } from 'react-redux';
import _ from 'lodash';
import { NavLink  } from "react-router-dom";
import ModalcreatePlaylist from './modalcreatePlaylist'
import ModalEditPlaylist from './modalEditPlaylist'
import "./MyOverview.scss"


class MyOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',          
            ArrayPlaylist : [],
            ArrayTrack : [],
            isOpenModalPlaylist : false, 
            isOpenModalEditUserAdm : false, 
            isOpenModalEditPlaylist : false, 
            userEdit : {},
            playlistEdit :{},

            

        }
    }


   
    async componentDidMount() {
  

    
        let {userinfor} = this.props;
        let user = userinfor;



        if(user && !_.isEmpty(user)){
            let id = user.id
            this.setState({
                userId : id
            })
            let response = await getALLPlaylist(id)
            if(response && response.errCode === 0) {
                let playlists = response.playlist.data.reverse();
                this.setState ({ 
                    ArrayPlaylist : playlists
                })
     
            }
    
        }

        
        if(user && !_.isEmpty(user)){
            let id = user.id
            this.setState({
                userId : id
            })
            let response = await GetAlllibrytracks(id)
            if(response && response.errCode === 0) {
                let playlists = response.playlist.reverse();
                this.setState ({ 
                    ArrayTrack : playlists
                })
     
            }
    
        }
       
        await this.getALLPlaylist();

        await this.GetAlllibrytracks();
    
    }

    getALLPlaylist = async() =>{
        let id = this.state.userId
        let response = await getALLPlaylist(id)
        if(response && response.errCode === 0) {
            let playlists = response.playlist.data.reverse();
            this.setState ({ 
                ArrayPlaylist : playlists
             })
             
        }
    }


    GetAlllibrytracks = async() =>{
        let id = this.state.userId
        let response = await GetAlllibrytracks(id)
        if(response && response.errCode === 0) {
            let playlists = response.playlist.reverse();
            this.setState ({ 
                ArrayTrack : playlists
             })
             
        }
    }

    togglePlaylistModal = () =>{

        this.setState({isOpenModalPlaylist : !this.state.isOpenModalPlaylist, })
 
     }

     togglePlaylistEditModal = () =>{
        this.setState ({isOpenModalEditPlaylist : !this.state.isOpenModalEditPlaylist})
    }

    createNewPlaylist = async (data) =>{
        console.log('check data',)
        try {
           let response = await createNewPlaylist(
               {
                playlistname : data.playlistname,
                imgplaylist :data.imgplaylist,
                userId :this.state.userId
                
            });
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getALLPlaylist();
               this.setState({
                isOpenModalPlaylist : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ tạo playlist success ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }


    handleAddNewPlaylist = () =>{

        this.setState({
            isOpenModalPlaylist :true,
        })

    }


    handleEdit = (playlist) =>{


        this.setState ({
            isOpenModalEditPlaylist : true,
            playlistEdit : playlist
        })

       

    }



    handleDelete = async (id) => {

  
        try {
            let res = await deletePlaylist(id)
            if(res && res.errCode === 0){
                
                await this.getALLPlaylist();
                toast.success(`  delete playlist successfully ` )

            }
            else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error);
            
        }


    }


    handleEditPlaylist = async(playlist) => {
        try {
            
            let res = await editPlaylist(playlist);
            if(res && res.errCode === 0){
                this.setState({ 
                    isOpenModalEditPlaylist: false,
                })
                await this.getALLPlaylist();
                toast.success('edit playlist successfully')
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }

  


    render() {
        let track = this.state.ArrayTrack

        const audioLists = track && track.map(track =>{
       
            let imageBase64trac = '';
            if(track.librytracks.track.imgsong){
            
                imageBase64trac = new Buffer(track.librytracks.track.imgsong, 'base64').toString('binary');
            }
          return {id : track.librytracks.track.id ,name : track.librytracks.track.namesong ,idsinger : track.librytracks.track.singerId, cover : imageBase64trac, musicSrc : track.librytracks.track.filetrack, duration : track.librytracks.track.duration, singer : track.librytracks.track.singer.singername}
    })
    






        let data = this.state.ArrayPlaylist
        return (
            <div className="myplayList-overview" >
                   <Title title='Thư Viện' />
                <div className="overview-song">



                        <div className="list-item-media--profile">

                {audioLists && audioLists.map((item, index) => {

                    return (

                            <MediaItem
                            
                                key={index}
                                imgsong={item.cover}
                                id ={item.id}
                                idsinger ={item.idsinger}
                                namesong={item.name}
                                singername={item.singer}
                                duration={item.duration}
                                getarray ={audioLists}
    
                            />


                    )                                                
                })
            }
                        </div>
                        


                                                    

                    <ModalcreatePlaylist
                    
                    isOpen={this.state.isOpenModalPlaylist}
                    toggleFromParent = {this.togglePlaylistModal}
                    createNewPlaylist = {this.createNewPlaylist}
               
                    
                
                    />
                     {this.state.isOpenModalEditPlaylist &&
                    <ModalEditPlaylist

                        isOpen={this.state.isOpenModalEditPlaylist}
                        toggleFromParent = {this.togglePlaylistEditModal}
                        currenPlaylist = {this.state.playlistEdit}
                        editPlaylist = {this.handleEditPlaylist}

                    />
                }                  

                </div>
                    <Title title='PlayList' />
                        <div className="overview-playlist">
                            <div className="createPlaylist"  onClick ={() => this.handleAddNewPlaylist()}>
                                <div className="createPlaylist-content">

                                    <i className="fas fa-plus"></i>
                                    <div className="titel-createPlaylist">
                                        Tạo Playlist Mới
                                    </div>

                                </div>
                            </div>
                            {data && data.map((item, index) => {

                                    let imageBase64trac = '';
                                    if(item.playlists.imgplaylist){
                                    
                                        imageBase64trac = new Buffer(item.playlists.imgplaylist, 'base64').toString('binary');
                                    }
                                    console.log(item.playlists.imgplaylist)

                                return( 

                                        <Myplaylist 
                                        key={index}
                                        name={item.playlists.playlistname}
                                        img={imageBase64trac}
                                        id={item.playlists.id}
                                        handleDelete = {this.handleDelete}

                                        
                                        />

                                    )   
                                })
                            }

                            
                                

                        </div>

                <div className="overview-Singer">
                    <div className="overview-Singer--care">
                        <img className="overview-Singer--img" src="https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/avatars/0/0/2/d/002d7bc760a3eabf5725e70797e8ac9f.jpg"   alt="" />
                        <NavLink className="name-singer--profile" style={{display: "block", textAlign: "center"}} to="https://zingmp3.vn/NgoKienHuy" >Ngô Kiên Huy</NavLink>
                        <p >169k quan tâm</p>
                        <button className ><i className="fas fa-check"></i> Đã Quan Tâm</button>

                    </div>

                </div>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        userinfor : state.user.userInfo,
     
    };
};

export default connect(mapStateToProps) (MyOverview);