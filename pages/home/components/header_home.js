import React from "react";
import { Row, Col, Typography, Select, Button, AutoComplete, Form, } from "antd";

const { Title } = Typography;
const { Option } = Select;

const HeaderLandingComp = (props) => {
  const [form] = Form.useForm();

  return (
    <div className="home-header-container">
      <div
        className="home-header"
        style={{ background: `url('/static/images/driver-home.jpg')` }}>
        <Form form={form}>
          <Row justify="center" align="middle">
            <Col xs={24} lg={18} md={18}>
              <div className="home-header__input-container">
                <Title>
                  {" "}
                  Teamwork & loyalty <br />
                  Driving our success
                </Title>
                <Row gutter={[16, 16]}>
                  <Col
                    xs={24}
                    lg={props.clearFilters ? 10 : 12}
                    md={props.clearFilters ? 10 : 12}
                  >
                    <AutoComplete
                      options={props.jobs_name}
                      size="large"
                      value={props.filters.name}
                      allowClear={true}
                      style={{ width: "100%" }}
                      placeholder="Search your new job"
                      onChange={(e) => props.handlerSearch(e, "job_name")}
                    />
                  </Col>
                  <Col xs={16} lg={8} md={8}>
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      allowClear
                      value={props.filters.city}
                      placeholder="Search your new job"
                      onChange={(e) => props.handlerSearch(e, "city")}
                    >
                      {props.cities.map((e, i) => (
                        <Option key={i} value={e.id}>
                          {e.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={8} lg={3} md={3}>
                    <Button
                      onClick={() => props.onSearchJobs()}
                      onKeyPress={() => props.onkeyPress()}
                      size="large"
                      style={{ width: "100%" }}
                      type="primary"
                    >
                      Search{" "}
                    </Button>
                  </Col>
                  {props.clearFilters && (
                    <Col xs={24} lg={3} md={3}>
                      <Button
                        onClick={() => props.resetFilter()}
                        size="large"
                        style={{ width: "100%" }}
                        type="secondary"
                      >
                        Clean Filters{" "}
                      </Button>
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default HeaderLandingComp;
