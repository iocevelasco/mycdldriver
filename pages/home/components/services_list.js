import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchServices } from "@store/reducers/landing_reducer";
import { Row, Col, Carousel } from "antd";
import CardServices from "components/CardServices";
import useMobileDetect from 'use-mobile-detect-hook';

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    servicesArray: state.landing.services,
  };
}

const ServicesList = (props) => {
  const detectMobile = useMobileDetect();
  const { servicesArray } = props;

  return (
    <div>
      {detectMobile.isMobile() ? 
        <Carousel autoplay={true} dots={false}>
          {servicesArray.map((service, key) => {
            return (
              <Col key={key} span={24}>
                <CardServices
                  type="home"
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
              </Col>
            );
          })}
        </Carousel> :
        <Row gutter={[24, 24]}>
        {servicesArray.map((service, key) => {
          return (
            <Col key={key} lg={12} md={12} xs={24}>
              <CardServices
                type="home"
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
            </Col>
          );
        })}
        </Row>
      }</div>
  );
};

export default connect(mapStateToProps)(ServicesList);
