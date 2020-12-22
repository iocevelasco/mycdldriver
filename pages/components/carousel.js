import React, { useRef, useState } from 'react';
import { Carousel, Avatar } from 'antd';



const CarouselComp = ({carousel_data}) => {
  const [slide, setSlide] = useState(0);

  const slider = useRef();

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
  };

  return (
    <div className='carousel'> 
      <Carousel
        dots={false}
        autoplay={false}
        ref={ref => {
          slider.current = ref;
        }}>
        {Object.keys(carousel_data).map((e, i) => {
          return <div className='carousel-item' key={i}>{carousel_data[e].map((e,o)=> <Avatar size={120} shape="square" key={o} src={e.img} alt={e.name}/> )}
          </div> 
        })}
    </Carousel>
  </div>
  )
}


export default CarouselComp;