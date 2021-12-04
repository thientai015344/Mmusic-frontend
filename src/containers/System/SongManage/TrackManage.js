import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {getALLTrack, createNewTrack, deleteTrack, editTrack } from '../../../services/TrackSevice';
import {emitter} from '../../../utils/emitter'
import ModalCreateTrack from './modalcreatetrack'
import ModalEditTrack from './modalEditTrack'
import { connect } from 'react-redux'
import './trackManage.scss'
class TrackManage extends Component {

 
    constructor(props) {
        super(props);
        this.state = {
            ArrayTrack : [],
            isOpenModalTrack : false, 
            isOpenModalEditTrack : false, 
            trackEdit : {},
           
            

        }
    }

    async componentDidMount() {
       
        await this.getALLTrack();

    }

    getALLTrack = async() =>{
        let response = await getALLTrack('ALL')
        if(response && response.errCode === 0) {
            let tracks =response.track.reverse();
            this.setState ({ 
                ArrayTrack : tracks
             })
             
        }
    }

    handleAddNewTrack = () =>{

        this.setState({
            isOpenModalTrack :true,
        })

    }



    toggleTrackModal = () =>{

       this.setState({isOpenModalTrack : !this.state.isOpenModalTrack, })

    }



    toggleTrackEditModal = () =>{
        this.setState ({isOpenModalEditTrack : !this.state.isOpenModalEditTrack})
    }


    createNewTrack = async (data) =>{
        try {
           let response = await createNewTrack(data);
           console.log('datacreat',response);
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getALLTrack();
               this.setState({
                isOpenModalTrack : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ create track successfully ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleDelete = async (track) => {

  
        try {
            let res = await deleteTrack(track.id)
            if(res && res.errCode === 0){

                await this.getALLTrack();

                toast.success(` ❤️, ""  delete singer successfully + ""+   ❤️ ` )

            }
            else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error);
            
        }


    }
    handleEdit = (track) =>{

        console.log('track' , track)

        this.setState ({
            isOpenModalEditTrack : true,
            trackEdit : track
        })

       

    }

    handleEditTrack = async(track) => {
        try {
            
            let res = await editTrack(track);
            if(res && res.errCode === 0){
                this.setState({ 
                    isOpenModalEditTrack: false,
                })
                await this.getALLTrack();
                toast.success('edit track successfully')
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }

    

    




    render() {
        let ArrayTrack = this.state.ArrayTrack;
   
        return (

            <div className="track-container">

                
                <ModalCreateTrack

                isOpen={this.state.isOpenModalTrack}
                toggleFromParent = {this.toggleTrackModal}
                createNewTrack = {this.createNewTrack}
                
                />
                {this.state.isOpenModalEditTrack &&
                    <ModalEditTrack

                        isOpen={this.state.isOpenModalEditTrack}
                        toggleFromParent = {this.toggleTrackEditModal}
                        currenTrack = {this.state.trackEdit}
                        editTrack = {this.handleEditTrack}

                    />
                }
                
                <div className="title text-center">
                        TRack MANAGE 
                </div>
                <div className="mx-3 mb-3">

                    <button className="btn btn-primary px-3"
                        onClick ={() => this.handleAddNewTrack()}
                         ><i className="fas fa-plus "></i> 
                        create Track
                    </button>



                </div>
                <div className="track-table mx-3">
                    <table id="customers">
                        <tbody>
                        <tr>

                      
                            <th>namesong</th>
                            <th>singername</th>
                            <th>duration</th>
                            <th>lyric</th>
                            <th>listen</th>
                           <th></th>
                        </tr>
                       
                            {ArrayTrack && ArrayTrack.map((item, index) => {
                                 return(
                                    <tr key={index}>
                                         <td>{item.namesong}</td>
                                         <td>{item.singer.singername}</td>
                                         <td>{item.duration}</td>
                                         <td>{item.lyric}</td>
                                         <td>{item.listen}</td>
                                         <td>
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

                                                 <button className="btn-add-album"  onClick = {() =>{this.handleEdit(item)}} >
                                                 <i className="fas fa-folder-plus">
                                                 </i>
                                                 </button>
                                                 
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackManage);