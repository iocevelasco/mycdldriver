import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Form,
  Button,
  Switch,
  InputNumber
} from 'antd';
import axios from 'axios';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  title: "Position Name",
  image: "https://image.freepik.com/vector-gratis/truck-logo-vector-imagen-archivo_56473-238.jpg",
  postion_id: 0,
  description: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.",
  address: "Miami",
  date: "12/04/23",
  expire_date: "12/05/23",
  company_name: "pepito",
  experience:[
    {key:1-2, value:'1 - 2'},
    {key:2-4, value:'2 - 4'},
    {key:4-6, value:'4 - 6'},
    {key:6-9, value:'6 - 9'},
    {key:10-15, value:'10 - 15'}
  ]
}

const types = {
  carousel_data: 'carousel_data',
  positions: 'positions',
  ranking: 'ranking',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload }
    case types.positions:
      return { ...state, positions: action.payload }
    case types.ranking:
      return { ...state, ranking: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const Profile = ({ user }) => {
  console.log(user);
  const [form] = Form.useForm();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formLayout, setFormLayout] = useState('horizontal');

  useEffect(() => {
  }, [])

  const onChange = (e, key) => {
    const newDash = state.dashboard;
    let value = "";
    switch (key) {
      default:
        value = e.target.value;
        newDash[key] = value;
        break;
    }
    dispatch({ type: types.ADD_NEW_DATA, payload: newDash })
  }
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 14 },
  }

  const { title, image, description, address, date, expire_date, company_name } = state

  return (
    <>
      <MainLayout title='Welcome' user={user}>
        <WrapperSection row={24} mt={0}>
          <div className='job-offert'>
            <Row>
              <Col className='job-offert__detaill' span={14}>
                <div className="header"
                  style={{
                    backgroundImage: `url('/static/images/truck3.jpg')`
                  }}>
                  <Avatar size={130} src={image} alt='image' />
                </div>
                <div>
                  <Title> {title} </Title>
                  <div>
                    <Text> Addres </Text>
                    <Text strong> {address} </Text> <Text strong > | </Text>
                    <Text> Date </Text>
                    <Text strong> {date} </Text>
                  </div>
                </div>
                <Text className='description'>{description}</Text>
              </Col>
              <Col className='job-offert__form' span={10}>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 24 }}
                  layout='horizontal'
                  form={form}>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="First Name"
                      onChange={(e) => onChange(e, 'name')} />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="Last Name"
                      onChange={(e) => onChange(e, 'last-name')} />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="Mail"
                      onChange={(e) => onChange(e, 'Mail')} />
                  </Form.Item>
                  <Row gutter={[24]} justify='space-between' align='middle'>
                  <Col span={13}>
                    <Form.Item>
                    <Row gutter={[24]} justify='space-between' >
                        <Col span={8}>
                          <Text style={{color:'#fff'}}> Age </Text>
                        </Col>
                        <Col span={14}>
                          <InputNumber 
                          min={1} 
                          max={10} 
                          defaultValue={3}
                          onChange={onChange} />
                        </Col>
                    </Row>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                   <Form.Item>
                      <Row gutter={[24]} justify='space-between' >
                        <Col span={16}>
                          <Text style={{color:'#fff'}}> Do you have CDL-A? </Text>
                        </Col>
                        <Col span={8}>
                          <Switch 
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />} />
                        </Col>
                      </Row> 
                    </Form.Item>
                  </Col>
                  </Row>
                  <Form.Item>
                    <Row gutter={[24]} justify='space-between' >
                      <Col span={10}>
                        <Input
                          size='large'
                          placeholder="Area Code"
                          onChange={(e) => onChange(e, 'last-name')} />

                      </Col>
                      <Col span={14}>
                        <Input
                          size='large'
                          placeholder="Phone Number"
                          onChange={(e) => onChange(e, 'last-name')} />
                      </Col>
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Input
                      size='large'
                      placeholder="Zip Code"
                      onChange={(e) => onChange(e, 'zip-code')} />
                  </Form.Item>
                  <Form.Item>
                  <Select 
                    placeholder="Experience"
                    size='large'
                    onChange={(e) => onChange(e, 'Mail')}>
                      {
                        state.experience.map((e,i)=>{
                        return <Option key={i} value={e.key}>{e.value}</Option>
                        })
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <TextArea
                      rows={4} 
                      size='large'
                      placeholder="Zip Code"
                      onChange={(e) => onChange(e, 'zip-code')} />
                  </Form.Item>
                  <Form.Item>
                    <Button style={{color:'#FF2A39'}} block size='large'>Submit</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

const WrapperSection = ({ children, row, mt, mb }) => {
  return (
    <div style={{ marginTop: mt, marginBottom: mb }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}



export default Profile;