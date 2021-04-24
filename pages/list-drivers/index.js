import React, { useEffect, useReducer, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Button,
  Rate,
  Divider,
  Card,
} from "antd";
import FormUserDriver from "components/FormUserDriver";
import {
  WrapperSection,
  MessageSuccess,
  MessageError,
} from "components/helpers";
import { withRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import axios from "axios";
import "./styles.less";

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;

const data = [];

for (let i = 0; i < 10; i++) {
  data.push({
    _id: i,
    name: "Omar",
    lastname: "Gonzalez",
    place: "Arizona - Phoenix",
    rating: Math.round(Math.random() * 5),
    img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  });
}

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
  const onSearch = (value) => console.log(value);

  const handleChange = (value) => console.log(`selected ${value}`);

  return (
    <WrapperSection row={18}>
      <Row className="list-drivers">
        <Col span={24}>
          <Row className="space-rows" justify="space-between" align="bottom">
            <h1 className="title">Drivers</h1>
            <Link href="/posts/first-post">Go Back</Link>
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
            {data.map((e) => {
              const { _id, name, lastname, place, rating, img } = e;
              return (
                <Col flex={1} className="card-driver" key={_id} span={6}>
                  <Card
                    className="card"
                    hoverable
                    cover={<img alt="example" src={img} />}
                  >
                    <Meta title={`${name} ${lastname}`} description={place} />
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
