import React  from 'react';
import {emitter} from '../../../utils/emitter'
import './modaltrack.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../utils/CommonUtils'
//impoxrt { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {getALLsINGERForTrack} from '../../../services/TrackSevice';

class ModalCreateTrack extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        ArraySingerForTrack : [],
        namesong: '',  //
        imgsong: '',
        filetrack: '',
        duration: '',
        SingerID: '',
        lyric: '', //
        listen: 0,
        previewImgUrl : '',
        isOpen: false,
    }
    this.listenToEmitter();


}
listenToEmitter () {

    emitter.on ('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
            namesong: '',
            imgsong: '',
            filetrack: '',
            duration: '',
            SingerID: '',
            lyric: '',
            listen: 0,
            previewImgUrl : '',
        })
    })

}

async componentDidMount() {
       
    await this.getALLsINGERForTrack();

}



getALLsINGERForTrack = async() =>{
    let response = await getALLsINGERForTrack('ALL')
    if(response && response.errCode === 0) {
        let singerforTracks = response.singer.reverse();
        this.setState ({ 
            ArraySingerForTrack : singerforTracks
         })
         
    }
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

        console.log('state', copyState)

    
       
    }

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = [ 'namesong',];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleAddNewTrack = () =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){
            this.props.createNewTrack(this.state);
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
                imgsong : base64,

                
            })

          
        }
    }

    handleOnchangeFileTrack = async (event) => {
        let files = event.target.files
        let formData = new FormData();
        formData.append('file', files[0])
        formData.append('upload_preset', 'fileaudio')


        const data = await fetch('https://api.Cloudinary.com/v1_1/thientai/video/upload',{
            method: 'POST',
            body: formData
        }).then(res => res.json())

        this.setState({
            filetrack : data.secure_url,
            duration : data.duration
        })

        

        
       
        
        
    }

  
    
    
    handleChange = (valueOption) => {


        let IDsinger = valueOption[0].value

        console.log('ffff' , IDsinger) // IDsinger = undefined
       
        this.setState({
            SingerID : IDsinger
        })
      };




    

    openPreview =() =>{
        if(!this.state.previewImgUrl) return;
        this.setState( {
            isOpen: true,
             
            
        })
    }




    render() {
        let SingerForTracks = this.state.ArraySingerForTrack; 
        const options = SingerForTracks && SingerForTracks.map(singer =>{
            return {label: singer.singername, value: singer.id}
        })
 
       let  valueOption = this.state.SingerID
        console.log('optopn',options) 


        
       

//  bug 
       

        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-track-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Create New Song</ModalHeader>
                    <ModalBody>
                     
                       
                
                        <div className="container-input-1">

                            <div className=" col-6 form-namesong">
                            <label htmlFor="inputnamesong4">Name Song</label>
                            <input type="namesong"
                                className="form-control" 
                                name="namesong"
                                value={this.state.namesong}
                                placeholder="namesong" 
                                onChange={(event)=>{this.handleOnchangeInput(event, 'namesong')}} />
                            </div>

                            

                            


                            
                        </div>


                        
                        <div className="container-input-2">
                            
                        <div className=" col-8 form-lyric">
                                <label htmlFor="inputlyric4">Lyric</label>
                                <input type="lyric"
                                    className="form-control"
                                    value={this.state.lyric}
                                    name="lyric" placeholder="lyric" 
                                    onChange={(event)=>{this.handleOnchangeInput(event, 'lyric')}}
                                />
                            </div>

                           
     


                        </div>

                        <div className="container-input-3">
                            
                        <div className=" col-12 form-singer">
                                <label htmlFor="inputsinger4">Singer</label>

                                    <Select
                                     isMulti
                                  
                                     onChange={this.handleChange}

                                     name="colors"
                                     options={options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"

                                    />

                            </div>
     


                        </div>



                        <div className="container-input-4">
                            <div className=" form-imgsong">
                                <label className="upload" htmlFor="inputimgsong">uploadfile<i className="fas fa-upload"></i> </label>
                                <input hidden id="inputimgsong" type="file" accept="image/png, image/jpeg"
                                    onChange={(event)=>{this.handleOnchangeImage(event)}}/>
                                </div>




                                <div className=" form-previewImg"
                                
                                    style={{backgroundImage: `url(${this.state.previewImgUrl})`}}

                                    onClick = {() =>{this.openPreview()}}
                                
                                >

                                    


                                </div>




                                <div className=" form-filetrack">
                                <label className="upload" htmlFor="inputfiletrack">uploadfile<i className="fas fa-upload"></i> </label>
                                <input hidden id="inputfiletrack" type="file" accept="audio/*"
                                    onChange={(event)=>{this.handleOnchangeFileTrack(event)}}/>
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
                <Button color="primary" className="px-3" onClick={() =>{this.handleAddNewTrack()}}>Create</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateTrack);

