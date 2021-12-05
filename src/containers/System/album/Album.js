import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {getALLAlbum, createNewAlbum, deleteAlbum, editAlbum , createAddTrack } from '../../../services/albumSevice';
import {getALLTrack} from '../../../services/TrackSevice';
import {emitter} from '../../../utils/emitter'
 import ModalCreateAlbum from './modalcreatealbum'
 import ModalEditAlbum from './modalEditAlbum'
 import ModalAddTrack from './modalAddTrack'
import { connect } from 'react-redux'
import './AlbumManage.scss'

class AlbumManage extends Component {

 
    constructor(props) {
        super(props);
        this.state = {
            ArrayAlbum : [],
            Arraytrack : [],
            isOpenModalAlbum : false, 
            isOpenModalEditAlbum : false, 
            isOpenModalAddTrack : false,
            albumEdit : {},
           
            

        }
    }

    async componentDidMount() {

        await this.getALLTrack();
       
        await this.getALLAlbum();

    }



    getALLAlbum = async() =>{
        let response = await getALLAlbum('ALL')
        
        if(response && response.errCode === 0) {       
            let albums =response.album.reverse();
            console.log('>>>> check data Alibum',albums)
            this.setState ({ 
                ArrayAlbum : albums
             })
             
        }
    }

    
    getALLTrack = async() =>{
        let response = await getALLTrack('ALL')
        
        if(response && response.errCode === 0) {
            let tracks =response.track.reverse();
            console.log('>>>> check data Alibum',tracks)
            this.setState ({ 
                Arraytrack : tracks
             })
             
        }
    }


  
    handleAddNewAlbum = () =>{

        this.setState({
            isOpenModalAlbum :true,
        })

    }



    toggleAlbumModal = () =>{

       this.setState({isOpenModalAlbum : !this.state.isOpenModalAlbum, })

    }

    toggleAddTrackModal = () =>{

        this.setState({isOpenModalAddTrack : !this.state.isOpenModalAddTrack, })
 
     }



    toggleAlbumEditModal = () =>{
        this.setState ({isOpenModalEditAlbum : !this.state.isOpenModalEditAlbum})
    }


    createNewAlbum = async (data) =>{
        try {
           let response = await createNewAlbum(data);
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getALLAlbum();
               this.setState({
                isOpenModalAlbum : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ create album successfully ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }


    createAddTrack = async (data) =>{
        try {
           let response = await createAddTrack(data);
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {   
               this.setState({
                isOpenModalAddTrack : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ add track for album successfully ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleDelete = async (album) => {

  
        try {
            let res = await deleteAlbum(album.id)
            if(res && res.errCode === 0){

                await this.getALLAlbum();

                toast.success(` ❤️, ""  delete album successfully + ""+   ❤️ ` )

            }
            else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error);
            
        }


    }
    handleEdit = (album) =>{


        this.setState ({
            isOpenModalEditAlbum : true,
            albumEdit : album
        })

       

    }

    handleEditAlbum = async(album) => {
        try {
            
            let res = await editAlbum(album);
            if(res && res.errCode === 0){
                this.setState({ 
                    isOpenModalEditAlbum: false,
                })
                await this.getALLAlbum();
                toast.success('edit album successfully')
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }

    handleAddTrackForlbum = () =>{

        this.setState({
            isOpenModalAddTrack :true,
        })

    }

    

    




    render() {
        let ArrayAlbum = this.state.ArrayAlbum;
        return (
            <div className="album-container">

                <ModalAddTrack
                    isOpen={this.state.isOpenModalAddTrack}
                    toggleFromParent = {this.toggleAddTrackModal}
                    createAddTrack = {this.createAddTrack}
                    getALLAlbum = {this.state.ArrayAlbum}
                    getAlltrack = {this.state.Arraytrack}
                
                />
                
                <ModalCreateAlbum
                    
                    isOpen={this.state.isOpenModalAlbum}
                    toggleFromParent = {this.toggleAlbumModal}
                    createNewAlbum = {this.createNewAlbum}
                
                />
                {this.state.isOpenModalEditAlbum &&
                    <ModalEditAlbum

                        isOpen={this.state.isOpenModalEditAlbum}
                        toggleFromParent = {this.toggleAlbumEditModal}
                        currenAlbum = {this.state.albumEdit}
                        editAlbum = {this.handleEditAlbum}

                    />
                }
                
                <div className="title text-center">
                        album MANAGE 
                </div>
                <div className="mx-3 mb-3">

                    <button className="btn btn-primary px-3"
                        onClick ={() => this.handleAddNewAlbum()}
                         ><i className="fas fa-plus "></i> 
                        create album
                    </button>

                    <button className="btn btn-info px-3"
                        onClick ={() => this.handleAddTrackForlbum()}
                         ><i className="fas fa-plus "></i> 
                         Add Track For Album
                    </button>

                </div>
                <div className="album-table mx-3">
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>albumname</th>
                            <th>action</th>
                        </tr>
                       
                            {ArrayAlbum && ArrayAlbum.map((item, index) => {
                                 return(
                                    <tr key={index}>
                                         <td>{item.nameAlbum}</td>      
                                         <td className="action">
                                             <button className="btn-edit"  onClick = {() =>{this.handleEdit(item)}} >
                                                 <i className="fas fa-edit">
                                                 </i></button>
                                             <button 
                                             className="btn-delete"
                                             onClick = {() =>{this.handleDelete(item)}}
                                             >
                                                 <i 
                                             className="fas fa-trash">
                                                 </i></button>
                                         </td>
                                     </tr>
                                    )

                                })
                            }
                        




                        </tbody>
                       
                    </table>
                </div>






            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumManage);