import React  from 'react';
import {emitter} from '../../../utils/emitter'
import 'react-image-lightbox/style.css';
import Select from 'react-select';
import {createAddTrack} from '../../../services/albumSevice';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class ModalAddTrack extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        ArrayTrackfro : [],
        trackId : [],
        albumId :'',
        isOpen: false,
    }
    this.listenToEmitter();


}
listenToEmitter () {

    emitter.on ('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
            
            previewImgUrl : '',
        })
    })

}

    toggle =() => {  
        this.props.toggleFromParent();
    }


    handleAddTrack = async() =>{
      let result = [];
        let tracId = this.state.trackId
        
        if (tracId && tracId.length >0){
            tracId.map(item => {
                let object = {};
                object.albumId = this.state.albumId;
                object.trackId = item.trackkkId;
                result.push(object);

            })

        } else{
            alert('khong co bai hat nao !')
        }
         
  
           
        
        console.log('check result', result)
      let res  = await createAddTrack({
            albumHasTrack : result
          })
      console.log('res ', res)
    }


  
    
    
    handleChangeAlbum = (valueOption) => {
        let IDalbum = valueOption.value
        this.setState({
            albumId : IDalbum
        })
      };



      handleChangeTrack = (track) => {

        let Idtrack = track && track.map(trackkk =>{
            return { trackkkId: trackkk.value}
        })

        this.setState({
            trackId : Idtrack,
        })

        console.log('Idtrack', Idtrack)


      }

    
    



    render() {
        let tracks = this.props.getAlltrack; 
        console.log('trackkkkk',tracks)
        const trackss = tracks && tracks.map(track =>{
            return {label: track.namesong, value: track.id}
        })



        let album = this.props.getALLAlbum; 
        console.log('arrayAllbumprops',album)
        const options = album && album.map(album =>{
            return {label: album.nameAlbum, value: album.id}
        })
 
      
        
       

//  bug 
       

        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-track-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Add track </ModalHeader>
                    <ModalBody>
                     
                       
                




                            <div className="container-input-3">
                                
                            <div className=" col-12 form-album">
                                    <label htmlFor="inputalbum4">album</label>

                                        <Select

                                            isClearable
                                            onChange={this.handleChangeAlbum}
                                           
                                            options={options}
                                        

                                        />

                                </div>
                            </div>
                      
                        <div className="container-input-3">
                            
                        <div className=" col-12 form-track">
                                <label htmlFor="inputtrack4">track</label>

                                    <Select
                                     isMulti
                                  
                                     onChange={this.handleChangeTrack}

                                     name="colors"
                                     options={trackss}
                                    className="basic-multi-select"
                                    classNamePrefix="select"

                                    />

                            </div>
     


                        </div> 

                    </ModalBody>
                <ModalFooter>
                <Button color="primary" className="px-3" onClick={() =>{this.handleAddTrack()}}>Create</Button>
                <Button color="secondary" className="px-3" onClick={() =>{this.toggle()}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}



export default ModalAddTrack;

