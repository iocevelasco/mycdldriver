import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from '@store/reducers/landing_reducer';
import CardServices from 'components/CardServices';

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
    <div className="services-list__container">
      {
        servicesArray.map((service, key) => {
          return <CardServices key={key} type='home' {...service} />
        })
      }
    </div >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
