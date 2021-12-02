import React  from 'react';
import './modalalbum.scss'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../utils/CommonUtils'
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalEditAlbum extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        id :'',
        nameAlbum : '',
        previewImgUrl : '',
        imgalbum : '',
        
   

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
       let album = this.props.currenAlbum;
       console.log('check data edit', album);
        if(album && !_.isEmpty(album)){

            let imageBase64 = '';
            if(album.imgAlbum){
               
                imageBase64 = new Buffer(album.imgAlbum, 'base64').toString('binary');
            }

           

            this.setState({
                id: album.id,
                nameAlbum :album.nameAlbum,  
                imgalbum : imageBase64,
                previewImgUrl: imageBase64,

            })
        }
       
    }

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['nameAlbum', 'imgalbum'];
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
                imgalbum : base64,

                
            })

            //console.log('hekko', imgalbum)

        }
    }

    handleSaveChangeAlbum = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.editAlbum(this.state);
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
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-album-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Edit Album</ModalHeader>
                    <ModalBody>

                        <div className="container-input-1">
                            <div className=" form-nameAlbum">
                                <label htmlFor="inputNameAlbum4">name Album</label>
                                <input type="nameAlbum"
                                    className="form-control" 
                                    name="nameAlbum"
                                    value={this.state.nameAlbum}
                                    placeholder="nameAlbum" 
                                    
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'nameAlbum')}} />
                                </div>

                        </div>


                        <div className="container-input-2">
                            <div className=" form-imgalbum">
                                <label className="upload" htmlFor="inputavataalbum">uploadfile<i className="fas fa-upload"></i> </label>
                                <input hidden id="inputavataalbum" type="file"
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
                <Button color="primary" className="px-3" onClick={() =>{this.handleSaveChangeAlbum()}}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditAlbum);








