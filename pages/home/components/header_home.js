import React from 'react';
import { Row, Col, Typography, Input, Space, Select, Button } from 'antd';
import { connect } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

function mapStateToProps(state) {
  return {
    citys_available: state.landing.citys_available
  }
}

const HeaderLandingComp = ({ handlerSearch, filter_selected, citys_available, ...props }) => {
  return (
    <>
      <div className="home-header"
        style={{
          background: `url('/static/images/truck11.jpg')`
        }}>
        <Row justify='center' align='middle'>
          <Col xs={24} lg={18} md={18}>
            <div className="home-header__input-container">
              <Title> TEAMWORK & LOYALTY <br />
                      DRIVING OUR SUCCESS
                    </Title>
              <Row gutter={[16]}> 
                <Col xs={24} lg={12} md={12}>
                  <Input
                    placeholder="Search your new job"
                    size='large'
                    onSearch={e => handlerSearch(e, 'input')} />
                </Col>
                <Col xs={24} lg={8} md={8}>
                  <Select
                    size="large"
                    style={{width: '100%'}}
                    value={filter_selected.city}
                    placeholder="Search by city"
                    onChange={e => handlerSearch(e, 'city')}>
                    {
                      citys_available.map((e, i) => (
                        <Option key={i} value={e}>{e}</Option>
                      ))
                    }
                  </Select>
                </Col>
                <Col xs={24} lg={4} md={4}>
                  <Button size="large" style={{width: '100%'}} type="primary">Search </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}


export default connect(mapStateToProps)(HeaderLandingComp);

