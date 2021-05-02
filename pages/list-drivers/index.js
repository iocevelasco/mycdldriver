import React, { useState, useEffect } from "react";
import { Row, Col, Input, Select, Rate, Divider, Card, Button } from "antd";
import { WrapperSection } from "components/helpers";
import { withRouter } from "next/router";
import Link from "next/link";
import { activeLoading } from '@store/reducers/landing_reducer';
import { connect } from "react-redux";
import axios from "axios";
import "./styles.less";
import { SpinnerComp } from 'components/helpers';
import DetailsDrawer from "./components/detailsDrawer";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDrivers } from '@hooks';

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;

function mapStateToProps(state) {
  return {
    isUserRegistry: state.user.typeUser,
    user: state.user,
    isLogin: state.user.isLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
  }
}
function ListDrivers(props) {
  const [selectedDriver, setSelectedDriver] = useState({});
  const [driverList, isFetching] = useDrivers();
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    props.activeLoading(false);
    setDrivers(driverList);
  }, [isFetching]);

  const onSearch = (value) => {
    const list = driverList.filter((user) => {
      const nombre = user.name.toLowerCase() + " " + user.lastname.toLowerCase();
      const resultName = nombre.indexOf(value.toLowerCase());
      const resultDln = user.driver.dln.indexOf(value.toLowerCase());
      if (resultName !== -1 || resultDln !== -1) {
        return true;
      } else {
        return false;
      }
    });
    setDrivers(list);
  }

  const handleSelect = (driverData) => {
    setSelectedDriver(driverData);
  };

  return (
    <WrapperSection row={18}>
      <DetailsDrawer
        driverData={selectedDriver}
        setSelectedDriver={setSelectedDriver}
      />
      <Row className="list-drivers">
        <Col span={24}>
          <Row className="space-rows" justify="space-between" align="bottom">
            <h1 className="title">Drivers</h1>
          </Row>
          <Row className="space-rows" justify="space-between" align="bottom">
            <Search
              placeholder="Search for name or number license"
              onSearch={onSearch}
              onChange={(e) => {
                onSearch(e.target.value);
              }}
              className="search-input"
            />
            <Link href="/">
              <Button type='link' icon={<ArrowLeftOutlined />} className="go-back">
                <span>Back</span>
              </Button>
            </Link>
          </Row>
          <Divider />
          <div className="list-drivers__container">
            <Row gutter={[16, 16]} className="space-rows">
              {drivers.map((driverData) => {
                const { _id, name, lastname, driver, rating, photo } = driverData;
                const city = driver.city ? driver.city.cityName : "";
                const state = driver.state ? driver.state.stateName : "";
                return (
                  <Col flex={1} className="card-driver" key={_id} span={6}>
                    <Card
                      onClick={() => handleSelect(driverData)}
                      className="card"
                      hoverable
                      cover={<img alt="example" src={photo} />}
                    >
                      <Meta
                        title={`${name} ${lastname}`}
                        description={`${state} - ${city}`}
                      />
                      <Rate
                        className="rating"
                        allowHalf
                        disabled
                        value={driver.rating}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
      <SpinnerComp active={isFetching} />
    </WrapperSection>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDrivers)
);
