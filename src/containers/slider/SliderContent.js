
import React, { Component } from 'react';
import Slider from "react-slick";
import './SliderContent.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class SliderContent extends Component {
    render() {
      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "100px",
        slidesToShow: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000
   
      };
        return (
          <div className="Wrap1 topslider" >
            <Slider {...settings}>
              <div>
                <h3> <img src="./img/slider/sliderdonw1_.jpg" alt=""/></h3>
              </div>
              <div>
                <h3> <img src="./img/slider/sliderdonw2_.jpg" alt=""/></h3>
              </div>
              <div>
                <h3> <img src="./img/slider/sliderdonw3_.jpg" alt=""/></h3>
              </div>
              <div>
                <h3> <img src="./img/slider/sliderdonw4_.jpg" alt=""/></h3>
              </div>
              <div>
                <h3> <img src="./img/slider/sliderdonw5_.jpg" alt=""/></h3>
              </div>
              <div>
                <h3> <img src="./img/slider/sliderdonw1_.jpg" alt=""/></h3>
              </div>
            </Slider>
          </div>
        );
      }
}

export default SliderContent;