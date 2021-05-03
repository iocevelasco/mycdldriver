import React, { useEffect, useState, useRef } from "react";
import { Col, Card, Typography, Rate, Button } from "antd";
import { connect } from "react-redux";
import { fetchDriversData } from "@store/reducers/landing_reducer";
import useMobileDetect from 'use-mobile-detect-hook';
import { withRouter } from "next/router";
import Link from 'next/link';
import { Carousel } from "antd";

const { Text, Title } = Typography;
const { Meta } = Card;

function mapStateToProps(state) {
  return {
    drivers: state.landing.drivers,
    typeUser: state.user.typeUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDrivers: () => dispatch(fetchDriversData()),
  };
}

const DriverListSection = (props) => {

  const detectMobile = useMobileDetect();
  useEffect(() => {
    props.fetchDrivers();
  }, []);
  const slider = useRef();

  return (
    <div className="home__driver-list">
      <Carousel
        dots={true}
        autoplay={false}
        slidesToShow={detectMobile.isMobile() ? 1 : 5}
        slidesToScroll={detectMobile.isMobile() ? 1 : 5}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        {props.drivers.map((e, key) => {
          return (
            <div key={key} className="home__driver-list--carousel-list">
              <div className="home__driver-list--container-card">
                <Card
                  hoverable={true}
                  cover={<img alt="driver-image" src={e.photo || '/static/images/cardDriver/user.png'} style={{ borderColor: "transparent" }} />}
                  className="home__driver-list__card"
                >

                  <Meta
                    title={`${e.name} ${e.lastname}`}
                    description={`${e.driver.state?e.driver.state.stateName:''}`}
                  />
                  <Rate className="home__driver-list--start" allowHalf disabled defaultValue={e.driver.rating} />
                </Card>
              </div>
            </div>
          );
        })}
      </Carousel>
      {
        props.typeUser === 2 ? <div className="home__driver-list--action-container">
          <Link href='/list-drivers'>
            <Button shape="round" ghost size='large'> View all </Button>
          </Link>
        </div> : null
      }
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverListSection)
);
