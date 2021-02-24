import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Typography, Rate } from "antd";
import { connect } from "react-redux";
import { fetchDriversData } from "@store/reducers/landing_reducer";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { withRouter } from "next/router";
import { Carousel } from "antd";

const { Text, Title } = Typography;
const { Meta } = Card;

function mapStateToProps(state) {
  return {
    drivers: state.landing.drivers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDrivers: () => dispatch(fetchDriversData()),
  };
}

const RankingComp = ({ drivers, fetchDrivers }) => {
  useEffect(() => {
    fetchDrivers();
  }, []);
  const slider = useRef();

  let widthScreen = useWindowSize().width;
  return (
    <div className="home__ranking" style={{ width: "100%" }}>
      <Carousel
        dots={true}
        autoplay={true}
        slidesToShow={widthScreen > 400 ? 4 : 1}
        slidesToScroll={widthScreen > 400 ? 4 : 1}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        {drivers.map((e, key) => {
          console.log('e', e);
          return (
            <Col key={key} className="home--ranking" lg={6} md={12} sm={22}>
              <Card
                hoverable={true}
                cover={<img alt="example" src={e.photo} style={{ borderColor: "transparent" }} />}
                style={{ width: "220px", marginTop: 24 }}
                className={"cardCarousel"}
                style={{ background: "rgb(0, 22, 40)", borderColor: "transparent" }}
              >

                <Meta
                  title={`${e.name} ${e.lastname}`}
                  description={`Address ${e.driver.address}`}
                />
                <div className="star-container">
                  <Rate allowHalf disabled defaultValue={e.driver.rating} />
                </div>
              </Card>
            </Col>
          );
        })}
      </Carousel>
    </div>
  );
};
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RankingComp)
);
