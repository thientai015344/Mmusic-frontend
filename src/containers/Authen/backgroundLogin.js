import React, { Component } from 'react';
import Login from '../Authen/login'
class BackgroundLogin extends Component {


 

    render() {



        return (

            

            <>



                <div className="modal1">
                    <div className="container ">
                        <div className="background--img"  >
                        <img src="../img/background/11.png"alt=""  />

                            <Login />

                        </div>
                    </div>
                </div>

                
            </>
        );
    }
}

export default BackgroundLogin;