import '../css/SliderContent.css';
import React, { Component } from 'react';
import { Carousel} from 'react-bootstrap';
class SliderContent extends Component {
    render() {
        return (
            <div> 
                <div className="slider warp ">
                     <Carousel>
                        <Carousel.Item interval={3000}>
                            <img
                            className="d-block w-100"
                            src="../img/slider/sliderdonw1_.jpg"
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                            className="d-block w-100"
                            src="../img/slider/sliderdonw2_.jpg"
                            alt="Second slide"
                            />
                            <Carousel.Caption>
                           
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item  interval={3000}>
                            <img
                            className="d-block w-100"
                            src="../img/slider/sliderdonw3_.jpg"
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                           
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item  interval={3000}>
                            <img
                            className="d-block w-100"
                            src="../img/slider/sliderdonw4_.jpg"
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item  interval={3000}>
                            <img
                            className="d-block w-100"
                            src="../img/slider/sliderdonw5_.jpg"
                            alt="Third slide"
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                </div>
           
            </div>
        );
    }
}

export default SliderContent;