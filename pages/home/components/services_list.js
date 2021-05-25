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

const ServicesList = (props) => {
  const { servicesArray } = props;

  return (
    <Row gutter={[24, 24]}>
      {
        servicesArray.map((service, key) => {
          return (
            <Col key={key} lg={12} md={12} xs={24}>
              <CardServices
                type='home'
                edit={false}
                image={service.image}
                city={service.city}
                email={service.email}
                title={service.title}
                whatsapp={service.whatsapp}
                _id={service._id}
                detail={service.detail}
                state={service.state}
              />
            </Col>)
        })
      }
    </Row>
  )
}

export default connect(mapStateToProps)(ServicesList);
