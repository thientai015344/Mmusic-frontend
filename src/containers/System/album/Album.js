import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {getALLSinger, createNewSinger, deleteSinger, editSinger } from '../../../services/singerSevice';
import {emitter} from '../../../utils/emitter'

import ModalCreateSinger from './modalcreatesinger'
import ModalEditSinger from './modalEditSinger'
import { connect } from 'react-redux'
import './SingerManage.scss'

class SingerManage extends Component {

 
    constructor(props) {
        super(props);
        this.state = {
            ArraySinger : [],
            isOpenModalSinger : false, 
            isOpenModalEditSinger : false, 
            singerEdit : {},
           
            

        }
    }

    async componentDidMount() {
       
        await this.getALLSinger();

    }

    getALLSinger = async() =>{
        let response = await getALLSinger('ALL')

        if(response && response.errCode === 0) {
            let singers =response.singer.reverse();
            this.setState ({ 
                ArraySinger : singers
             })
             
        }
    }

    handleAddNewSinger = () =>{

        this.setState({
            isOpenModalSinger :true,
        })

    }



    toggleSingerModal = () =>{

       this.setState({isOpenModalSinger : !this.state.isOpenModalSinger, })

    }



    toggleSingerEditModal = () =>{
        this.setState ({isOpenModalEditSinger : !this.state.isOpenModalEditSinger})
    }


    createNewSinger = async (data) =>{
        try {
           let response = await createNewSinger(data);
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getALLSinger();
               this.setState({
                isOpenModalSinger : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')

                toast.success('❤️ create singer successfully ❤️')
            }
            
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleDelete = async (singer) => {

  
        try {
            let res = await deleteSinger(singer.id)
            if(res && res.errCode === 0){

                await this.getALLSinger();

                toast.success(` ❤️, ""  delete singer successfully + ""+   ❤️ ` )

            }
            else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error);
            
        }


    }
    handleEdit = (singer) =>{


        this.setState ({
            isOpenModalEditSinger : true,
            singerEdit : singer
        })

       

    }

    handleEditSinger = async(singer) => {
        try {
            
            let res = await editSinger(singer);
            if(res && res.errCode === 0){
                this.setState({ 
                    isOpenModalEditSinger: false,
                })
                await this.getALLSinger();
                toast.success('edit singer successfully')
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }

    

    




    render() {
        let ArraySinger = this.state.ArraySinger;
        return (
            <div className="singer-container">
                
                <ModalCreateSinger

                isOpen={this.state.isOpenModalSinger}
                toggleFromParent = {this.toggleSingerModal}
                createNewSinger = {this.createNewSinger}
                
                />
                {this.state.isOpenModalEditSinger &&
                    <ModalEditSinger

                        isOpen={this.state.isOpenModalEditSinger}
                        toggleFromParent = {this.toggleSingerEditModal}
                        currenSinger = {this.state.singerEdit}
                        editSinger = {this.handleEditSinger}

                    />
                }
                
                <div className="title text-center">
                        singer MANAGE 
                </div>
                <div className="mx-3 mb-3">

                    <button className="btn btn-primary px-3"
                        onClick ={() => this.handleAddNewSinger()}
                         ><i className="fas fa-plus "></i> 
                        create singer
                    </button>

                </div>
                <div className="singer-table mx-3">
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>singername</th>
                            <th>description</th>
                            <th>action</th>
                        </tr>
                       
                            {ArraySinger && ArraySinger.map((item, index) => {
                                 return(
                                    <tr key={index}>
                                         <td>{item.singername}</td>
                                         <td>{item.description}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingerManage);