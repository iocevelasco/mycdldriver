import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchServices } from '@store/reducers/landing_reducer';
import { Row, Col } from 'antd';
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
    <Row gutter={[24, 24]}>
      {
        servicesArray.map((service, key) => {
          return <Col lg={12} md={12} xs={24}>
            <CardServices key={key} type='home' {...service} />
          </Col>
        })
      }
    </Row>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
