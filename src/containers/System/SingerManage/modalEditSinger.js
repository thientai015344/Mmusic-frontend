import React  from 'react';
import './modalsinger.scss'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../utils/CommonUtils'
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalEditSinger extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        id :'',
        singername : '',
        description : '',
        previewImgUrl: '',
        avatasinger : '',
   

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
       let singer = this.props.currenSinger;
        if(singer && !_.isEmpty(singer)){

            let imageBase64 = '';
            if(singer.avatasinger){
               
                imageBase64 = new Buffer(singer.avatasinger, 'base64').toString('binary');
            }

           

            this.setState({
                id: singer.id,
                singername :singer.singername, 
                description :singer.description,
                avatasinger : imageBase64,
                previewImgUrl: imageBase64,

            })
        }
       
    }

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['singername', 'description', 'avatasinger'];
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

    handleSaveChangeSinger = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.editSinger(this.state);
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
                <ModalHeader toggle={() =>{this.toggle()}}>Edit Singer</ModalHeader>
                    <ModalBody>

                        <div className="container-input-1">
                            <div className=" form-singername">
                                <label htmlFor="inputSingername4">singername</label>
                                <input type="singername"
                                    className="form-control" 
                                    name="singername"
                                    value={this.state.singername}
                                    placeholder="singername" 
                                    
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'singername')}} />
                                </div>

                            <div className=" form-description">
                            <label htmlFor="inputPassword4">description</label>
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
                <Button color="primary" className="px-3" onClick={() =>{this.handleSaveChangeSinger()}}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditSinger);








