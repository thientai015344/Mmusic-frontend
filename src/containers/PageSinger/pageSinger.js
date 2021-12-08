import React, { Component } from 'react';
import Title from '../../components/Title';
import './pageSinger.scss'
import SingerItem from '../../components/singerItem';
import { NavLink } from 'react-router-dom'
import {getALLSinger} from '../../services/singerSevice';




class PageSinger extends Component {





    constructor(props) {
        super(props);
        this.state = {
            ArraySinger : [],
            getarray : []
        }
    }



    async componentDidMount() {
       
        await this.getALLSinger();

        let singer = this.state.ArraySinger
        this.setState({
            getarray : singer
        })

    }

    getALLSinger = async() =>{
        let response = await getALLSinger('ALL')
        if(response && response.errCode === 0) {
            let singers =response.singer.reverse();
            this.setState ({ 
                ArraySinger : singers
                 
             })
             
        }
    }

  
   





    render() {
        let ArraySinger = this.state.ArraySinger;

        let singerkAray = this.state.getarray; 
        const audioLists = singerkAray && singerkAray.map(track =>{
            let imageBase6495 = '';
            if(track.avatasinger){
            
                imageBase6495 = new Buffer(track.avatasinger, 'base64').toString('binary');
            }
          return { anh: imageBase6495}
          })
        

        let anhdd = audioLists[0]
          let text ='';
        if( anhdd ){
            
            let anh1 = Object.values(anhdd)
            
            text = anh1.toString();
        }

   
        console.log(text);
        return (
            <div>


               <div className="Marding-60">

                   <div className="singer-top">
                       <div className="avata-singer-top">
                        <img src={text} alt="" className="avata-singer--top"/>
                       </div>
                       <div className="singer-down">
                           <Title title="TOP Nghệ Sĩ Trending Trong Tháng" />
                                <div className="item-new-singer ">
                                {singerkAray && singerkAray.splice(0, 6).map((singer, index) => {
                                        let imageBase649 = '';
                                                    if(singer.avatasinger){
                                                    
                                                        imageBase649 = new Buffer(singer.avatasinger, 'base64').toString('binary');
                                                    }

                                            return(
                                                <div className="item-singer col-6">
                                                    <div className="index-item">
                                                        {index+1}
                                                    </div>
                                                    <div className="img-singer-item">
                                                        <img src={imageBase649} alt="" className="img-item-singer" />
                                                    </div>

                                                    <NavLink to={`/singer/${singer.id}`} className="name-item-singer">
                                                        {singer.singername}
                                                    </NavLink>

                                                </div>

                                            )

                                        })
                                    }
                                </div>
                    </div>

                 </div>   
                <Title title=" Ca Sĩ"  />

                <div className="singer-item" >

                    {ArraySinger && ArraySinger.map((item, index) => {

                           
                                let imageBase64 = '';
                                            if(item.avatasinger){
                                            
                                                imageBase64 = new Buffer(item.avatasinger, 'base64').toString('binary');
                                            }

                                    return(

                                            <SingerItem 
                                            
                                            key={index}
                                            singername = {item.singername}
                                            id={item.id}
                                            img ={imageBase64}

                                            />

                                            
                                    
                                        )

                                    })
                                }
         

                

                    </div>

               </div>

          
            

            </div>
        );
    }
}

export default PageSinger;