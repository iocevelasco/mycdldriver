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

const HeaderLandingComp = ({ handlerSearch, filter_selected, citys_available, ...props}) => {
  console.log(props)
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
                <Row>
                  <Col span={24}>
                    <Search
                      placeholder="input search text"
                      size='large'
                      onSearch={e => handlerSearch(e, 'input')}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={24} style={{marginTop: 16}}>
                      <Input.Group size="large">
                        <Row gutter={[16, 16]}>
                          <Col  xs={10} lg={5} md={5}>
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
                          <Col  xs={14} lg={8} md={8}>
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

