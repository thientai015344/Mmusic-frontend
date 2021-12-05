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
   
        return (
            <div>


               <div className="Marding-60">

                   <div className="singer-top">
                       <div className="avata-singer-top">
                            <img src="https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/01/04/e/f/b/c/1609742824669_600.jpg" alt="" className="avata-singer--top"/>
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
                                                        {index}
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

                            console.log('index', index)
                                let imageBase64 = '';
                                            if(item.avatasinger){
                                            
                                                imageBase64 = new Buffer(item.avatasinger, 'base64').toString('binary');
                                            }

                                    return(

                                            <SingerItem 
                                            
                                            key={index}
                                            singername = {item.singername}
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