import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Button,
  AutoComplete,
  Form,
} from "antd";
import { fetchJobPositionData } from "@store/reducers/landing_reducer";
import { connect } from "react-redux";

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

function mapStateToProps(state) {
  return {
    citys: state.landing.citys || [],
    jobs_name: state.landing.jobs_name || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query)),
  };
}

const HeaderLandingComp = ({
  handlerSearch,
  cleanFilter,
  filter_selected,
  jobs_name,
  citys,
  query,
  fetchJobs,
}) => {
  const [value, setValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [form] = Form.useForm();
  const clearFilters = query.length ? true : false;

  const resetForm = () => {
    form.resetFields();
    setValue("");
    setSelectValue(null);
    cleanFilter();
  };

  const onChangeAutocomplete = (e) => {
    handlerSearch(e, "input");
    setValue(e);
  };

  const onChangeSelect = (e) => {
    handlerSearch(e, "city");
    setSelectValue(e);
  };

  return (
    <div className="home-header-container">
      <div
        className="home-header"
        style={{
          background: `url('/static/images/driver-home.jpg')`,
        }}
      >
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
                    lg={clearFilters ? 10 : 12}
                    md={clearFilters ? 10 : 12}
                  >
                    <AutoComplete
                      options={jobs_name}
                      size="large"
                      allowClear={true}
                      value={value}
                      style={{ width: "100%" }}
                      placeholder="Search your new job"
                      onChange={(e) => onChangeAutocomplete(e)}
                    />
                  </Col>
                  <Col xs={16} lg={8} md={8}>
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      allowClear
                      value={selectValue}
                      value={filter_selected.city}
                      placeholder="Search by city"
                      onChange={(e) => onChangeSelect(e)}
                    >
                      {citys.map((e, i) => (
                        <Option key={i} value={e.id}>
                          {e.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={8} lg={3} md={3}>
                    <Button
                      onClick={() => fetchJobs(query)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          fetchJobs(query);
                        }
                      }}
                      size="large"
                      style={{ width: "100%" }}
                      type="primary"
                    >
                      Search{" "}
                    </Button>
                  </Col>
                  {clearFilters && (
                    <Col xs={24} lg={3} md={3}>
                      <Button
                        onClick={() => resetForm()}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLandingComp);
