import React  from 'react';
//import './modalplaylist.scss'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../utils/CommonUtils'
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class ModalEditPlaylist extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        id :'',
        playlistname : '',
        previewImgUrl : '',
        imgplaylist : '',
        
   

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
       let playlist = this.props.currenPlaylist;
       console.log('check data edit', playlist);
        if(playlist && !_.isEmpty(playlist)){

            let imageBase64 = '';
            if(playlist.imgPlaylist){
               
                imageBase64 = new Buffer(playlist.imgPlaylist, 'base64').toString('binary');
            }

           

            this.setState({
                id: playlist.id,
                playlistname :playlist.namePlaylist,  
                imgplaylist : imageBase64,
                previewImgUrl: imageBase64,

            })
        }
       
    }

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['namePlaylist', 'imgplaylist'];
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
                imgplaylist : base64,

                
            })

            //console.log('hekko', imgplaylist)

        }
    }

    handleSaveChangePlaylist = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid == true){
            this.props.editPlaylist(this.state);
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
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-playlist-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Edit Playlist</ModalHeader>
                    <ModalBody>

                        <div className="container-input-1">
                            <div className=" form-namePlaylist">
                                <label htmlFor="inputNamePlaylist4">name Playlist</label>
                                <input type="namePlaylist"
                                    className="form-control" 
                                    name="namePlaylist"
                                    value={this.state.namePlaylist}
                                    placeholder="namePlaylist" 
                                    
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'namePlaylist')}} />
                                </div>

                        </div>


                        <div className="container-input-2">
                            <div className=" form-imgplaylist">
                                <label className="upload" htmlFor="inputavataplaylist">uploadfile<i className="fas fa-upload"></i> </label>
                                <input hidden id="inputavataplaylist" type="file"
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
                <Button color="primary" className="px-3" onClick={() =>{this.handleSaveChangePlaylist()}}>Save</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditPlaylist);








