import React, { useRef } from "react";
import { Button } from "antd";
import { CardDriver } from '@components/Cards'
import useMobileDetect from 'use-mobile-detect-hook';
import { withRouter } from "next/router";
import Link from 'next/link';
import { Carousel } from "antd";


const DriverListSection = (props) => {console.log(props);
  const handleSelect = (id) => {
    console.log('d', id);
  }
  const detectMobile = useMobileDetect();
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
        {/*props.driversList.map((data, key) => {
          const city = data.driver.city ? data.driver.city.cityName : "";
          const state = data.driver.state ? data.driver.state.stateName : "";
          return (
            <div key={key} className="home__driver-list--carousel-list">
              <CardDriver
                handlerAction={() => handleSelect(data)}
                city={city}
                state={state}
                fullName={`${data.name} ${data.lastname}`}
                rating={data.driver.rating}
                photo={data.photo}
                darkTheme={false}
              />
            </div>
          );
        })*/}
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

export default withRouter(DriverListSection);
