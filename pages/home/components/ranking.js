import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Avatar, Typography, Button } from "antd";
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

  const stars = [1, 2, 3, 4, 5];

  let widthScreen = useWindowSize().width;
  return (
    <div style={{ width: "100%" }}>
      <Carousel
        dots={false}
        autoplay={false}
        slidesToShow={widthScreen > 400 ? 3 : 1}
        slidesToScroll={widthScreen > 400 ? 3 : 1}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        {drivers.map((e, key) => {
          return (
            <Col key={key} className="home--ranking" lg={6} md={12} sm={22}>
              <Card
                hoverable={true}
                cover={<img alt="example" src={e.photo} />}
                style={{ width: "260px", marginTop: 24 }}
                className={"cardCarousel"}
              >
                <div className="star-container">
                  {e.rating}
                  {e.driver.rating == 0 ? (
                    <StarOutlined key={key} style={{ color: "#FFE206" }} />
                  ) : (
                    stars.map((p, key) => {
                      {
                        if (p <= e.driver.rating) {
                          <StarFilled key={key} style={{ color: "#FFE206" }} />;
                        }
                      }
                    })
                  )}
                </div>
                <Meta
                  title={`${e.name} ${e.lastname}`}
                  description={`Address ${e.driver.address}`}
                />
              </Card>
            </Col>
          );
        })}
      </Carousel>
    </div>
  );
};
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RankingComp)
);
