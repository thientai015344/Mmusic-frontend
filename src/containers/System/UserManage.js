import React, { Component } from 'react';
//imporxt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './userManage.scss'
import {getAllUSER, createNewUserAdm, deleteUserAdm} from '../../services/USERService';
import ModalUserAdm from './modaluserAdm';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ArrayUser : [],
            isOpenModalUserAdm : false, 
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
           }
        
        } catch (error) {
            console.log(error);
        }
      
    }

    handleDelete = async (user) => {

        console.log('click delete', user)
        try {
            let response = await deleteUserAdm(user.id)
            console.log(response)
            
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
                
                <div className="title text-center">
                        manager hehe
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
                                             <button className="btn-edit"><i className="fas fa-edit"></i></button>
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
