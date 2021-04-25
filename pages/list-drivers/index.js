import React, { useState } from "react";
import { Row, Col, Input, Select, Rate, Divider, Card } from "antd";
import { WrapperSection } from "components/helpers";
import { withRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import axios from "axios";
import "./styles.less";
import data from "./dataDummy.json";
import DetailsDrawer from "./components/detailsDrawer";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
  return {};
}

function ListDrivers(props) {
  const [selectedDriver, setSelectedDriver] = useState({});

  const onSearch = (value) => console.log(value);

  const handleChange = (value) => console.log(`selected ${value}`);
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
            {data.map((driverData) => {
              const { _id, name, lastname, profile, rating, img } = driverData;
              return (
                <Col flex={1} className="card-driver" key={_id} span={6}>
                  <Card
                    onClick={() => handleSelect(driverData)}
                    className="card"
                    hoverable
                    cover={<img alt="example" src={img} />}
                  >
                    <Meta
                      title={`${name} ${lastname}`}
                      description={profile.state}
                    />
                    <Rate
                      className="rating"
                      allowHalf
                      disabled
                      value={rating}
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
