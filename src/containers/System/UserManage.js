import React, { Component } from 'react';
//imporxt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'
import {getAllUSER, createNewUserAdm, deleteUserAdm, editUserAdm} from '../../services/USERService';
import ModalUserAdm from './modaluserAdm';
import ModalEditUser from './modalEditUser';
import {emitter} from '../../utils/emitter'

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ArrayUser : [],
            isOpenModalUserAdm : false, 
            isOpenModalEditUserAdm : false, 
            userEdit : {}
            

        }
    }

    async componentDidMount() {
       
        await this.getAllUsers();

    }

    getAllUsers = async() =>{
        let response = await getAllUSER('ALL')
        if(response && response.errCode === 0) {
            this.setState ({ 
                ArrayUser : response.user
             })
             
        }
    }

    handleAddNewUser = () =>{

        this.setState({
            isOpenModalUserAdm :true,
        })

    }
    toggleUserModal = () =>{

       this.setState({isOpenModalUserAdm : !this.state.isOpenModalUserAdm, })

    }
    toggleUserEditModal = () =>{
        this.setState ({isOpenModalEditUserAdm : !this.state.isOpenModalEditUserAdm})
    }


    createNewUser = async (data) =>{
        try {
           let response = await createNewUserAdm(data);
           if(response && response.errCode !== 0){
               alert(response.errMessage);
           }else {
               await this.getAllUsers();
               this.setState({
                   isOpenModalUserAdm : false
               })
               emitter.emit('EVENT_CLEAR_MODAL_DATA')
           }
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleDelete = async (user) => {

  
        try {
            let res = await deleteUserAdm(user.id)
            if(res && res.errCode === 0){

                await this.getAllUsers();

            }
            else{
                alert(res.errMessage)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    handleEdit = (user) =>{

       

        this.setState ({
            isOpenModalEditUserAdm : true,
            userEdit : user
        })

    }

    handleEditUser = async(user) => {
        try {
            
            let res = await editUserAdm(user);
            if(res && res.errCode === 0){
                this.setState({ 
                    isOpenModalEditUserAdm: false,
                })
                await this.getAllUsers();
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }

    

    




    render() {
        let ArrayUser = this.state.ArrayUser;
        return (
            <div className="user-container">
                
                <ModalUserAdm

                isOpen={this.state.isOpenModalUserAdm}
                toggleFromParent = {this.toggleUserModal}
                createNewUser = {this.createNewUser}
                
                />
                {this.state.isOpenModalEditUserAdm &&
                    <ModalEditUser

                        isOpen={this.state.isOpenModalEditUserAdm}
                        toggleFromParent = {this.toggleUserEditModal}
                        currenUser = {this.state.userEdit}
                        ediUser = {this.handleEditUser}

                    />
                }
                
                <div className="title text-center">
                        USER MANAGE 
                </div>
                <div className="mx-3 mb-3">

                    <button className="btn btn-primary px-3"
                        onClick ={() => this.handleAddNewUser()}
                         ><i className="fas fa-plus "></i> 
                        create user
                    </button>

                </div>
                <div className="user-table mx-3">
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>username</th>
                            <th>email</th>
                            <th>phonenumber</th>
                            <th>roleId</th>
                            <th>action</th>
                        </tr>
                       
                            {ArrayUser && ArrayUser.map((item, index) => {
                                 return(
                                    <tr key={index}>
                                         <td>{item.username}</td>
                                         <td>{item.email}</td>
                                         <td> {item.phonenumber} </td>
                                         <td> {item.roleId}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
