
import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class SliderSinger extends Component {
    render() {
      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "40px",
        slidesToShow: 2,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000
   
      };
        return (
          <div className="Wrap1" >
            <Slider {...settings}>
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/jack.png" alt=""/></h3>
              </div>
            
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/duc-phuc.png" alt=""/></h3>
              </div>
             
             
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/chi-dan.png" alt=""/></h3>
              </div>
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/onlyc.png" alt=""/></h3>
              </div>
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/trinh-thang-binh.png" alt=""/></h3>
              </div>
              <div className="imgSlidesingger" >
                <h3> <img src="https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/artists/v2/mrsiro.png" alt=""/></h3>
              </div>
            </Slider>
          </div>
        );
      }
}

export default SliderSinger;