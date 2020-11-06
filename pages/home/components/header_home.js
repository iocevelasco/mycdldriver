import React from 'react';
import { Row, Col, Typography, Input, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;

const { Search } = Input;

function mapStateToProps(state){
  return {
      citys_available: state.landing.citys_available
  }
}

const HeaderLandingComp = ({ handlerSearch, filter_selected, citys_available}) => {
  return (
    <>
        <div className="home-header"
          style={{
            background: `url('/static/images/truck11.jpg')`
          }}>
          <Row justify='center' align='middle'>
            <Col span={18}>
              <div className="home-header__input-container">
                <Title> TEAMWORK & LOYALTY <br />
                      DRIVING OUR SUCCESS
                    </Title>
                <Row>
                  <Col span={24}>
                    <Search
                      placeholder="input search text"
                      size='large'
                      value={filter_selected.input}
                      onSearch={e => handlerSearch(e, 'input')}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={24} style={{marginTop: 16}}>
                      <Input.Group size="large">
                        <Row gutter={[16, 16]}>
                          <Col span={5}>
                          <Select 
                            size="large"
                            style={{ width: '100%' }}
                            value={filter_selected.city}
                            placeholder="City"
                            onChange={e => handlerSearch(e, 'city')}>
                              {
                                citys_available.map((e, i)=>(
                                  <Option key={i}value={e}>{e}</Option>
                                ))
                              }
                          </Select>
                          </Col>
                          <Col span={8}>
                            <DatePicker 
                            onChange={e => handlerSearch(e, 'date')}
                            size="large" style={{ width: '100%' }} />
                          </Col>
                        </Row>
                      </Input.Group>
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

