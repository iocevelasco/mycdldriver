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
  useEffect(() => {
    props.fetchServices();
  }, [])

  return (
    <div className="home__services">
      {
        servicesArray.map((service, key) => {
          return <CardServices type='home' {...service} />
        })
      }
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
