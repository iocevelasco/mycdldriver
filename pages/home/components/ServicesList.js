import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Typography, Carousel } from 'antd';
import { fetchServices } from '@store/reducers/landing_reducer';
import CardServices from 'components/CardServices';
import Link from 'next/link';

const { Text, Title } = Typography

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    servicesArray: state.landing.services
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchServices: () => dispatch(fetchServices())
  }
}

const ServicesList = (props) => {
  const { servicesArray } = props;
  const slider = useRef();
  useEffect(() => {
    props.fetchServices();
  }, [])


  let widthScreen = useWindowSize().width;

  const settings = {
    dots: true,
    autoplay: false,
    position: 'bottom',
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: widthScreen > 400 ? 2 : 1,
    slidesToScroll: widthScreen > 400 ? 2 : 1,
    initialSlide: 0,
    arrows: true,
    adaptiveHeight: true,
  };
  return (
    <div className="home__services">
      <Carousel {...settings}>
        {
          servicesArray.map((service, key) => {
            return <div key={key}>
              <CardServices type='home' {...service} />
            </div>
          })
        }
      </Carousel>
    </div >
  )
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
