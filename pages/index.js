import React, { Component } from 'react';
import MainLayout from '../components/layouts/mainLayout';
import { Row, Col, Typography, Input, DatePicker, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const { Search } = Input;

const Home = (props) => {
  return (
    <>
      <MainLayout>
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
                      onSearch={value => console.log(value)}
                      style={{ width: '100%' }}
                    />
                  </Col>
                  <Col span={24} style={{marginTop: 16}}>
                      <Input.Group size="large">
                        <Row gutter={[16, 16]}>
                          <Col span={5}>
                          <Select size="large" style={{ width: '100%' }}  defaultValue="Zhejiang">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                          </Select>
                          </Col>
                          <Col span={8}>
                            <DatePicker size="large" style={{ width: '100%' }} />
                          </Col>
                        </Row>
                      </Input.Group>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  )
}


export default Home;