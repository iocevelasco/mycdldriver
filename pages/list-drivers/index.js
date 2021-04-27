import React, { useState, useEffect } from "react";
import { Row, Col, Input, Select, Rate, Divider, Card } from "antd";
import { WrapperSection } from "components/helpers";
import { withRouter } from "next/router";
import Link from "next/link";
import { activeLoading } from '@store/reducers/landing_reducer';
import { connect } from "react-redux";
import axios from "axios";
import "./styles.less";
import data from "./dataDummy.json";
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
  console.log('driverList', driverList);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    props.activeLoading(false);
    setDrivers(driverList);
  }, [isFetching]);

  const onSearch = (value) => console.log(value);

  const handleChange = (value) => {
    console.log(value)
  };
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
            <Link href="/posts/first-post">
              <div className="go-back">
                <ArrowLeftOutlined /> <span>Back</span>
              </div>
            </Link>
          </Row>
          <Row className="space-rows" justify="space-between" align="bottom">
            <Search
              placeholder="Search for name or number license"
              onSearch={onSearch}
              className="search-input"
            />
            <Select
              defaultValue="qualification"
              onChange={handleChange}
              className="select-input"
            >
              <Option value="name">Name</Option>
              <Option value="state">State</Option>
              <Option value="qualification">Qualification</Option>
            </Select>
          </Row>
          <Divider />
          <Row gutter={[16, 16]} className="space-rows">
            {drivers.map((driverData) => {
              const { _id, name, lastname, driver, rating, photo } = driverData;
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
                      description={driver.state}
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
        </Col>
      </Row>
    </WrapperSection>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDrivers)
);
