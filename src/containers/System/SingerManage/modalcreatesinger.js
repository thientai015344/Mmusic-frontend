import React  from 'react';
import {emitter} from '../../../utils/emitter'
import './modalsinger.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../utils/CommonUtils'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalCreateSinger extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        singername : '',
        description : '',
        previewImgUrl : '',
        avatasinger : '',
        isOpen: false,
    }
    this.listenToEmitter();
}
listenToEmitter () {

    emitter.on ('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
            singername : '',
            description : '',
            avatasinger : '',
            previewImgUrl : '',
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
        let arrInput = ['singername', 'description'];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewSinger = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.createNewSinger(this.state);
       }

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

    openPreview =() =>{
        if(!this.state.previewImgUrl) return;
        this.setState( {
            isOpen: true,
             
            
        })
    }




    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-singer-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Create New Singer</ModalHeader>
                    <ModalBody>
                     
                       
                
                        <div className="container-input-1">

                            <div className=" form-singername">
                            <label htmlFor="inputsingername4">singername</label>
                            <input type="singername"
                                className="form-control" 
                                name="singername"
                                value={this.state.singername}
                                placeholder="singername" 
                                onChange={(event)=>{this.handleOnchangeInput(event, 'singername')}} />
                            </div>

                            <div className=" form-description">
                            <label htmlFor="inputdescription4">description</label>
                            <input type="description"
                                className="form-control"
                                value={this.state.description}
                                name="description" placeholder="description" 
                                onChange={(event)=>{this.handleOnchangeInput(event, 'description')}}/>
                            </div>


                            
                        </div>


                        <div className="container-input-2">
                            <div className=" form-avatasinger">
                                <label className="upload" htmlFor="inputavatasinger">uploadfile<i className="fas fa-upload"></i> </label>
                                <input hidden id="inputavatasinger" type="file"
                                    onChange={(event)=>{this.handleOnchangeImage(event)}}/>
                                </div>

                                <div className=" form-previewImg"
                                
                                    style={{backgroundImage: `url(${this.state.previewImgUrl})`}}

                                    onClick = {() =>{this.openPreview()}}
                                
                                >

                                    


                                </div>

     


                        </div>

                            {this.state.isOpen == true  &&
                                <Lightbox
                                    mainSrc={this.state.previewImgUrl}                                   
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                  />                           
                            }

                    </ModalBody>
                <ModalFooter>
                <Button color="primary" className="px-3" onClick={() =>{this.handleAddNewSinger()}}>Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateSinger);








