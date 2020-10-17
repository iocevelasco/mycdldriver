import React from 'react';
import MainLayout from '../../../components/layout';
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
  InputNumber,
  Radio,
  DatePicker,
  message
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const DriverUser = (props) => {
  const { company, onChangeBase, onChangeCompany, newCompany, base} = props;
  const [form] = Form.useForm();
  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={14}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={base.photo} size={120} />
            </div>
          </Row>
          <Form
            form={form}
            name="user-driver"
            initialValues={{ remember: true }}
            layout='horizontal'>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  hasFeedback
                  validateStatus={base.name.length <= 0 ? 'error' : 'success'}
                  help="Should be combination of numbers & alphabets">
                  <Input
                    size='large'
                    placeholder="Name"
                    value={base.name}
                    onChange={(e) => onChangeBase(e, 'name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input
                    size='large'
                    placeholder="Last Name"
                    value={base.lastname}
                    onChange={(e) => onChangeBase(e, 'lastname')} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input
                size='large'
                placeholder="Mail"
                value={base.email}
                onChange={(e) => onChangeBase(e, 'email')} />
            </Form.Item>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Area Code"
                    value={company.areaCode}
                    onChange={(e) => onChangeCompany(e, 'areaCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Phone Number"
                    value={company.phoneNumber}
                    onChange={(e) => onChangeCompany(e, 'phoneNumber')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Zip Code"
                    value={company.zipCode}
                    onChange={(e) => onChangeCompany(e, 'zipCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Address"
                    value={company.address}
                    onChange={(e) => onChangeCompany(e, 'address')} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className='profile-driver__form-small' span={14}>
          <Row gutter={[24]} justify='space-between' >
            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input
                  size='large'
                  placeholder="Trade Name"
                  value={company.tradename}
                  onChange={(e) => onChangeCompany(e, 'tradename')} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input
                  size='large'
                  placeholder="Legal Number"
                  value={company.legalNumber}
                  onChange={(e) => onChangeCompany(e, 'legalNumber')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24]} justify='space-between' >
            <Col span={24}>
              <Form.Item>
                <TextArea
                  rows={4}
                  size='large'
                  placeholder="Description"
                  value={company.description}
                  onChange={(e) => onChangeCompany(e, 'description')} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24]} justify='end' align='middle'>
            <Col span={6}>
              <Button
                onClick={newCompany}
                type='primary'
                block
                size='large'>Save Information</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default DriverUser;