import React  from 'react';
import {emitter} from '../../utils/emitter'
import './modaluserAdm.scss'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalUserAdmin extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        username : '',
        password : '',
        email : '',
        phonenumber : '',
        roleId : '0',

    }
    this.listenToEmitter();
}
listenToEmitter () {

    emitter.on ('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
            username : '',
            password : '',
            email : '',
            phonenumber : '',
            roleId : '0',

        })
    })

}


    // componentDidMount() {

    //  }

    toggle =() => {
     

        this.props.toggleFromParent();

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
        let arrInput = ['username', 'password', 'email', 'phonenumber'];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false; 
                toast.warn('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewUser = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.createNewUser(this.state);
       }

    }




    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-useradm-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Create New Admin</ModalHeader>
                    <ModalBody>
                     
                       
                            
                                    <div className="container-input-1">
                                        <div className=" form-username">
                                        <label htmlFor="inputUsername4">UserName</label>
                                        <input type="userName"
                                         className="form-control" 
                                         name="username"
                                         value={this.state.username}
                                          placeholder="userName" 
                                          onChange={(event)=>{this.handleOnchangeInput(event, 'username')}} />
                                        </div>

                                        <div className=" form-password">
                                        <label htmlFor="inputPassword4">Password</label>
                                        <input type="password"
                                         className="form-control"
                                         value={this.state.password}
                                          name="password" placeholder="Password" 
                                           onChange={(event)=>{this.handleOnchangeInput(event, 'password')}}/>
                                        </div>
                                    </div>

                         
                                    <div className="container-input-2">
                                        <div className=" form-email">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input type="email" 
                                            className="form-control"
                                            value={this.state.email}
                                             name="email" placeholder="Email" 
                                              onChange={(event)=>{this.handleOnchangeInput(event, 'email')}}/>
                                        </div>
                                        <div className=" form-phone">
                                            <label htmlFor="inputPhone4">PhoneNumber</label>
                                            <input type="phoneNumber"
                                             className="form-control" 
                                             name="phonenumber" 
                                             placeholder="PhoneNumber" 
                                             value={this.state.phonenumber}
                                              onChange={(event)=>{this.handleOnchangeInput(event, 'phonenumber')}}/>      
                                        </div>

                                        <select 
                                            className="form-roleId" 
                                            name="roleId">   
                                            <option value="0">admin</option>
                                        </select>
                                    </div>
                                    
                              
                                    
                        
                                    
       
                                    
                    
                  
                   
                
                    </ModalBody>
                <ModalFooter>
                <Button color="primary" className="px-3" onClick={() =>{this.handleAddNewUser()}}>Create</Button>{' '}
                <Button color="secondary" className="px-3" onClick={() =>{this.toggle()}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserAdmin);








