import React  from 'react';
import {emitter} from '../utils/emitter'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {getALLComment, createNewCommentTrack} from '../services/TrackSevice';
import {  Modal, ModalHeader, ModalBody} from 'reactstrap';  
import './modacommettrack.scss'
class ModalComment extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        userId : '',
        contentcmt :'',
        trackId : '',
        arraycomment :[],

    }
    this.listenToEmitter();
}
listenToEmitter () {

    emitter.on ('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
          
            contentcmt :'',
            

        })
    })

}


async componentDidMount() {
  

    
    let audioLists = this.props.userinfor;
    

    this.setState({
        userId : audioLists
    })
   
    await this.getALLComment();

    


}

getALLComment = async() =>{
    let idd =this.props.id
    this.setState({
        trackId : idd
     })
    let response = await getALLComment(idd)
    if(response && response.errCode === 0) {
        let comments =response.data.reverse();
        this.setState ({ 
            arraycomment : comments
             
         })
         
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

    checkvalidateInput = () => {
        let isValid = true;
        let arrInput = ['contentcmt', ];
        for( let i = 0; i < arrInput.length; i++ ){
          
            if(!this.state[arrInput[i]]){
                isValid = false; 
                toast.warn('missing parameter : ' +arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    
    sendcomment = async() =>{
       let isValid = this.checkvalidateInput();
       if(isValid === true){

           await createNewCommentTrack({
            trackId : this.state.trackId,
            contentcmt : this.state.contentcmt,
            userId : this.state.userId,

            })

            await this.getALLComment();

        this.setState({

            contentcmt :'',
        })


            
       }

    }




    render() {

       

       

        let comment =this.state.arraycomment
       
         const commentlist = comment && comment.map(comment =>{
          let imageBase64 = '';
          if(comment.comments.user.avata){
          
              imageBase64 = new Buffer(comment.comments.user.avata, 'base64').toString('binary');
          }


        return {username :comment.comments.user.username , name: comment.comments.user.interfaceName, cover:imageBase64, comment: comment.comments.contentcmt }
        })
    
       
        

        return (
            <Modal isOpen={this.props.isOpen} toggle={() =>{this.toggle()}} className={'modal-useradm-container'}>
                <ModalHeader toggle={() =>{this.toggle()}}>Bình Luận</ModalHeader>
                    <ModalBody>


                        <div className="modal-comment">
                            <div className="modal-input--comment">
                                <div className="modal-cratenewcomment">
                                    <div className="modal-imgcreate">
                                    <img className="img-newcommet" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""  />
                                    </div>
                                    <div className="form-input">

                                        <input type="contentcmt"
                                            className="form-control-input" 
                                            name="contentcmt"
                                            value={this.state.contentcmt}
                                            placeholder="Viết bình luận...." 
                                            onChange={(event)=>{this.handleOnchangeInput(event, 'contentcmt')}} />

                                    </div>
                                        
                                    <button className="send-comment"
                                     onClick={() => this.sendcomment()}  >
                                     <i className="fas fa-paper-plane" ></i>
                                    </button>
                                </div>

                            </div>

                            <div className="modal-getCommemt">
                                <h2 className="modal-count-comment">
                                    {commentlist.length} Comments
                                </h2>

                                <div className="modal-all-itemCommet">
                                
             
                                {commentlist && commentlist.map((item, index) => {
                                    
                                        return(
                                        
                                            <div className="modal-item--comment">
                                                <div className="modal-img-comment">
                                                    <img className="img-item-comment" src={item.cover == '' ? "https://bootdey.com/img/Content/avatar/avatar1.png" : item.cover} alt=""  />
                                                </div>
                                                <div className="modal-content--commet">
                                                    <div className="modal-nameuer-item">
                                                        {item.name== null ? item.username : item.name}
                                                    </div>
                                                    <div className="modal-content-item">
                                                        {item.comment}
                                                    </div>

                                                </div>
                                            </div>

                                        )

                                    })
                                }
               

                            
                                </div>

                                
                                
                            </div>`

                        </div>

                    
                
                    </ModalBody>
                
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
      userinfor : state.user.userInfo,

      trackid : state.idtrack.idtrack
    };
};


export default connect(mapStateToProps)(ModalComment);








