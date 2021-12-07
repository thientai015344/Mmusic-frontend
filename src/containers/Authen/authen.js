import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook, faGoogle, faApple} from '@fortawesome/free-brands-svg-icons'
import './authen.css'


   

export default class Authen extends Component {
constructor(props){
    super(props);
    this.state = {
        username :"",
        password :"",
        rpassword :"",
        phonenumber :""

    }
}
handleGetussername = (event) =>{
    this.setState({ ussername: event.target.value})
}
handleGetpassword = (event) =>{
    this.setState({ password: event.target.value})
}
handleGetrpassword = (event) =>{
    this.setState({ rpassword: event.target.value})
}
handleGetphonNumber = (event) =>{
    this.setState({ phonenumber: event.target.value})
}



hanleRegitter = (event) => {
    event.preventDefault()
    
}



    render() {
        return (
            <div>
                <div className="modal1">
                    <div className="container ">
                        <div className="background--img"  >
                        <img src="./img/backgroud.gif"alt=""  />
                        <form>
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
                                         value={this.state.ussername}
                                         onChange={(event) => this.handleGetussername(event)}
                                        className="input-login name"/>
                                        <input type="password" placeholder="mật khẩu"
                                        value={this.state.password}
                                        onChange={(event) => this.handleGetpassword(event)}
                                        className="input-login password"/>
                                        <input type="password" placeholder="Nhập lại mật khẩu"
                                        value={this.state.rpassword}
                                        onChange={(event) => this.handleGetrpassword(event)}
                                         className="input-login replace password"/>
                                        <input type="text" placeholder="Số điện thoại"
                                        value={this.state.phonenumber}
                                        onChange={(event) => this.handleGetphonNumber(event)} className="input-login phonenumber"/>

                                    </div>
                                    <div className="attentionn">
                                            <input className="check-all" defaultChecked ="checked" type="checkbox"/>
                                            <div className="DK">
                                                <label>tôi đã đọc và đồng ý các   </label>   
                                                <a href="/">điều khoản và điều kiện</a>
                                            </div>
                                        </div>
                                    <button onClick={ (event)=>this.hanleRegitter(event)} className="button-login">Đăng ký</button>
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
                                    Bạn đã có tài khoản?
                                </div>
                                <a href="/#" className="login">Đăng nhập</a>
                            </div>
                        </div>


                    </form>

                </div>
            </div>
                
                </div>
            </div>
        )
    }
}




  