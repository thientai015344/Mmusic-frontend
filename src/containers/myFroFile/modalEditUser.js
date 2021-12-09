import React  from 'react';
import './modaluserAdm.scss'
import Lightbox from 'react-image-lightbox';
import CommonUtils from '../../utils/CommonUtils'
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalEditUser extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        id :'',
        username : '',
        interfaceName: '',   
        password : '',
        email : '',
        phonenumber : '',
        avatar : '',
        previewImgUrl: '',
        roleId : '1',

    }

}

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


    componentDidMount() {

        let user = this.props.currenUser;
         if(user && !_.isEmpty(user)){
             this.setState({
                 id: user.id,
                 username :user.username,
                 password :'harpassword',
                 email :user.email,
                 phonenumber :user.phonenumber,
             })
         }
        
     }

    componentDidUpdate(prevProps){

        if(prevProps.currenUser !== this.props.currenUser){
    
            let user = this.props.currenUser;
            
                console.log('uêrdert', user)
                if(user && !_.isEmpty(user)){
                    this.setState({
                        id: user.id,
                        username :user.username,
                        interfaceName:user.interfaceName,
                        password :'harpassword',
                        email :user.email,
                        phonenumber :user.phonenumber,
                       
                    })
                 }

        }

    }

    

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['username', 'password', 'email', 'phonenumber','interfaceName'];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            console.log(' base64file :' , base64); 
            let objectURL = URL.createObjectURL(file);
            this.setState({
                
                previewImgUrl : objectURL,
                avatasinger : base64,

                
            })

            //console.log('hekko', avatasinger)

        }
    }

    handleSaveChangeUser = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.editUser(this.state);
       }

    }

  
    openPreview =() =>{
        if(!this.state.previewImgUrl) return;
        this.setState( {
            isOpen: true,
             
            
        })
    }




    render() {
     
        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-useradm-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Chỉnh sửa Profile</ModalHeader>
                    <ModalBody>

                        
                            <div className=" form-username mt-2 col-12">
                                <label htmlFor="inputUsername4">Tên đăng nhập</label>
                                <input type="userName"
                                    className="form-control" 
                                    name="username"
                                    value={this.state.username}
                                    placeholder="userName" 
                                    disabled
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'username')}} />
                            </div>

                        
                            <div className=" form-email mt-4 col-12 ">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" 
                                className="form-control"
                                value={this.state.email}
                                    name="email" placeholder="Email" 
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'email')}}/>
                            </div>

                            <div className=" form-phone mt-4 col-12">
                                <label htmlFor="inputPhone4">số điện thoại</label>
                                <input type="phoneNumber"
                                    className="form-control" 
                                    name="phonenumber" 
                                    placeholder="PhoneNumber" 
                                    value={this.state.phonenumber}
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'phonenumber')}}/>      
                            </div>

                            <div className=" form-phone mt-4 col-12">
                                <label htmlFor="inputinterfaceName4">Tên giao diện</label>
                                <input type="interfaceName"
                                    className="form-control" 
                                    name="interfaceName" 
                                    placeholder="interfaceName" 
                                    value={this.state.interfaceName}
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'interfaceName')}}/>      
                            </div>

                            


                            <div className=" form-avatasinger mt-4 col-12">
                                <label className="upload" htmlFor="inputavatasinger">upload Ảnh <i className="fas fa-upload"></i> </label>
                                <input hidden id="inputavatasinger" type="file"
                                    onChange={(event)=>{this.handleOnchangeImage(event)}}/>
                                </div>

                                <div className=" form-previewImg"
                                
                                    style={{backgroundImage: `url(${this.state.previewImgUrl})`}}

                                    onClick = {() =>{this.openPreview()}}
                                
                                >

                        </div>
                        
                    
                                    
                        
                            {this.state.isOpen == true  && 
                                <Lightbox
                                    mainSrc={this.state.previewImgUrl}                                   
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                  />                           
                            }
                                    
       
                                    
                    
                  
                   
                
                    </ModalBody>
                <ModalFooter>
                <Button color="primary" className="px-3" onClick={() =>{this.handleSaveChangeUser()}}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);








