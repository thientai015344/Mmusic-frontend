import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'
import * as actions from "../../store/actions";
import { createNewUserAdm, } from '../../services/USERService';
import './login.css';




class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {

            username : '',
            password : '',
            email : '',
            passwordpasswordreplay: '',
            phonenumber : '',
            isShowPassword :false,
            
    
        }
    }

    handleOnchangeInput =(event, id) => {

        
        
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

    
       
    }

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['username', 'password','passwordpasswordreplay'];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false; 
                toast.warn('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
  
    handleAddRegister = async() =>{
        let isValid = this.checkvalidateInput();
        if(isValid === true){

            try {
                let response = await createNewUserAdm({

                        username : this.state.username,
                        password : this.state.password ,
                        email : this.state.email,
                        phonenumber : this.state.phonenumber,
                        roleId : '1',
                });
                if(response && response.errCode !== 0){
                 toast.error(' tai khoa da ton taij ')           
                }else {

                    await createNewUserAdm({
                        username : this.state.username,
                        password : this.state.password ,
                       email : this.state.email,
                        phonenumber : this.state.phonenumber,
                        roleId : '1',
         
                     })

                                            
                        this.setState({
                
                            username : '',
                            password : '',
                            email : '',
                            passwordpasswordreplay: '',
                            phonenumber : '',
                            isShowPassword :false,
                        })
                    
                        toast.success('tạo tài khoản thành công ... đăng nhập thôi nào'  );     
                }
             
                } catch (error) {
                     console.log(error);
             }      
        }
    }

     showHiderPassword = () =>{
        this.setState({ 
         
         isShowPassword: !this.state.isShowPassword
 
         })
     }



    render() {
 
        return (
            <>
                <div className="modal1">
                    <div className="container ">
                        <div className="background--img"  >
                        <img src="../img/background/11.png"alt=""  />
                     
                        <div className="form-login "> 
                            <div className="pading30">
                                <div className="form-login-header">
                                    <p className="form-login_title">
                                        Đăng Ký
                                    </p>
                                </div>
                                <div className="form-login-container">
                                <div className="login-input">
                                        <input type="text" placeholder="Tên tài khoản"
                                         value={this.state.username}
                                        onChange={(event)=>{this.handleOnchangeInput(event, 'username')}}
                                        className="input-login name"/>

                                        

                                        <div className="custom-input">
                                            <input type="password" placeholder="mật khẩu"
                                            type={this.state.isShowPassword ? 'text' : 'password' }
                                            value={this.state.password }
                                            onChange={(event)=>{this.handleOnchangeInput(event, 'password')}}
                                            className="input-login password"
                                            />  

                                            <span className ="span-icon"
                                                  onClick= {() =>{this.showHiderPassword()}}
                                                  ><i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash" }></i>                                    

                                            </span>
                                           

                                        </div>

                                        <input type="password" placeholder="mật khẩu"   
                                            value={this.state.passwordpasswordreplay }
                                            onChange={(event)=>{this.handleOnchangeInput(event, 'passwordpasswordreplay')}}
                                            className="input-login password"
                                            />  

                                        <input type="text" placeholder="số điện thoại"
                                         value={this.state.phonenumber}
                                        onChange={(event)=>{this.handleOnchangeInput(event, 'phonenumber')}}
                                        className="input-login name"/>

                                         <input type="text" placeholder="email"
                                         value={this.state.email}
                                        onChange={(event)=>{this.handleOnchangeInput(event, 'email')}}
                                        className="input-login name"/>


                                    </div>
                                    <div className="col-12" style={{color: 'red'}}>
                                        {this.state.errMessage}
                                    </div>
                                    
                                    <button className="button-login" onClick={() =>{this.handleAddRegister()}} >Đăng Ký</button>
                                   
                                </div>
                            </div>
                            <div className="form-logi-footer">
                                <div className="form-logi-footer-title">
                                    Bạn đã có tài Khoản 
                                </div>
                                <NavLink to="/authen/login" className="login">Đăng Nhập !</NavLink>
                            </div>
                        </div>
                    </div> 
                </div> 
                </div>     
           
               
                
               
            </>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
      
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
