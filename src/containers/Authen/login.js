import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faGoogle, faApple} from '@fortawesome/free-brands-svg-icons'
import * as actions from "../../store/actions";
import { NavLink } from 'react-router-dom'
import './login.css';
import { handleLoginApi } from '../../services/USERService'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username :"",
            password :"",
            errMessage:"",
            isShowPassword :false,
            
    
        }
    }

    handleGetussername = (event) =>{
        this.setState({ username: event.target.value})
    }
    handleGetpassword = (event) =>{
        this.setState({ password: event.target.value})
    }

    showHiderPassword = () =>{
       this.setState({ 
        
        isShowPassword: !this.state.isShowPassword

        })
    }

    handleLogin = async () => {
        this.setState({ 
            errMessage: ''
        })
        try {
           let data = await handleLoginApi(this.state.username, this.state.password)
           console.log('datalogin', data)
           if(data && data.errCode !==0){
               this.setState({ errMessage: data.message})
           }
           if(data && data.errCode ==0){
               this.props.userLoginSuccess(data.user)
               console.log('login successfully')
           }
               
           
            
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({errMessage: error.response.data.message})

                }
            }
            console.log('tai' , error.response)
            
            
        }
    }



    render() {
 
        return (
            <>
              
                        <div className="form-login "> 
                            <div className="pading30">
                                <div className="form-login-header">
                                    <p className="form-login_title">
                                        Đăng Nhập
                                    </p>
                                </div>
                                <div className="form-login-container">
                                <div className="login-input">
                                        <input type="text" placeholder="Tên tài khoản"
                                         value={this.state.username}
                                         onChange={(event) => this.handleGetussername(event)}
                                        className="input-login name"/>
                                        <div className="custom-input">
                                            <input type="password" placeholder="mật khẩu"
                                            type={this.state.isShowPassword ? 'text' : 'password' }
                                            value={this.state.password }
                                            onChange={(event) => this.handleGetpassword(event)}
                                            className="input-login password"
                                            />  
                                            <span className ="span-icon"
                                                  onClick= {() =>{this.showHiderPassword()}}
                                                  ><i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash" }></i>                                    

                                            </span>
                                           

                                        </div>


                                    </div>
                                    <div className="col-12" style={{color: 'red'}}>
                                        {this.state.errMessage}
                                    </div>
                                    
                                    <button className="button-login" onClick={()=> {this.handleLogin()}} >Đăng Nhập</button>
                                    <div className="form-login-container-line">
                                        <div className="line"></div>
                                        <div className="or">HOẶC</div>
                                        <div className="line"></div>
                                    </div>
                                    <div className="form-login-container-loginWith">
                                        <button className="facebook height-button">
                                            <div className="icon-icon ">
                                                <FontAwesomeIcon icon ={faFacebook}  /> 
                                            </div>
                                            <p className="name-facebook">Facebook</p>  
                                        </button>
                                        <button className="google height-button">
                                            <div className="icon-icon2 ">
                                            <FontAwesomeIcon icon ={faGoogle}  /> 
                                            </div>
                                            <p className="name-google">Google</p>
                                        </button>
                                        <button className="apple height-button">
                                            <div className="icon-icon" >
                                             <FontAwesomeIcon icon ={faApple}  /> 
                                            </div>
                                            <p className="name-apple">Apple</p>
                                        </button>
                                    </div>
                                    <div className="form-login-container--attention">
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="form-logi-footer">
                                <div className="form-logi-footer-title">
                                    Bạn chưa có tài Khoản 
                                </div>
                                <NavLink to="/authen/register" className="login">Đăng Ký ngay !</NavLink>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
