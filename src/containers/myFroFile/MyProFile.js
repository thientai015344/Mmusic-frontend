import React, { Component } from 'react';
import {  Link  } from "react-router-dom";
import MyOverview from "./MyOverview"
import {getAllUSER, editUserAdm} from "../../services/USERService"
import { connect } from 'react-redux';
import ModalEditUser from './modalEditUser';
import * as actions from "../../store/actions";
import './MyProfile.scss'

class MyProFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',          
            ArrayUser : {},
            isOpenModalEditUserAdm : false, 
            userEdit : {}
            

        }
    }



    async componentDidMount() {
  

    
        let {userinfor} = this.props;
        let useridd ='';
        if(userinfor.id){
            useridd = userinfor.id
        }
      
        this.setState({
            userId : useridd
        })
       
        await this.getAllUSER();

       
        let response = await getAllUSER(useridd)
        if(response && response.errCode === 0) {
            this.setState ({ 
                ArrayUser : response.user
             })
             
        }
    
        
    
    
    }

    getAllUSER = async() =>{
        let id = this.state.userId
        let response = await getAllUSER(id)
        if(response && response.errCode === 0) {
            this.setState ({ 
                ArrayUser : response.user
             })
             
        }
    }

    toggleUserEditModal = () =>{
        this.setState ({isOpenModalEditUserAdm : !this.state.isOpenModalEditUserAdm})
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
                await this.getAllUSER();
            }
            else{
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
            
        }

        
    }










    render() {


        const { processLogout } = this.props;



        let user = this.state.ArrayUser
        let imageBase64 = '';
        if(user.avata){
        
            imageBase64 = new Buffer(user.avata, 'base64').toString('binary');
        }
        

        return (

            <>

                <ModalEditUser

                isOpen={this.state.isOpenModalEditUserAdm}
                toggleFromParent = {this.toggleUserEditModal}
                currenUser = {this.state.userEdit}
                editUser = {this.handleEditUser}

                />

           
            <div className ="myprofile">
               <div className="profile-default">
                   <div className="profile-setting">
                    <i class="fas fa-user-cog"></i>
                    <div className="sub-setting">
                        <button className="btn-setting--edit" onClick = {() =>{this.handleEdit(user)}} > Chỉnh Sửa</button>
                        <button className="btn-setting--lockout" onClick={processLogout} > Đăng Xuất</button>
                    </div>
                   </div>



                   <div className="profile-avata">
                            <img className="profile-picture--img" src={imageBase64 == '' ? "https://bootdey.com/img/Content/avatar/avatar1.png" : imageBase64} alt="" />
                   </div>

                   <div className="profile-name">
                   {user.interfaceName== null ? user.username : user.interfaceName}
                        
                   </div>

                   <div className="bar-userProfile">
                        <ul className="content__bar-menu">
                            <li  className="content__bar-item active">
                                <Link to="/myfrofile" >Tổng quan</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/song">Bài hát</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/playlist">Playlist</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/album">Album</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/video">MV</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/library/artist">Nghệ sĩ</Link>
                            </li>
                            <li className="content__bar-item">
                                <Link to="/myfrofile/upload">Tải lên</Link>
                            </li>
                        </ul>
                    </div>
               </div>

               <div className="container-myprofile">
                
                <MyOverview />

                   </div>
               
                
            </div>
            </>
          
        );
    }
}

const mapStateToProps = state => {
    return {

        userinfor : state.user.userInfo,

        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default (connect(mapStateToProps, mapDispatchToProps) (MyProFile));