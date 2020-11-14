import React from 'react';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Form,
  Button,
  Upload,
  InputNumber,
  Radio,
  DatePicker,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
const { TextArea } = Input;

const driverUser = (props) => {
  const [form] = Form.useForm();

  const { 
    driver, 
    onChangeBase, 
    onChangeDriver, 
    handleDatePicker,
    newDrivers, 
    updateDriver, 
    base, 
    beforeUpload, 
    propsUpload, 
    imageDln,
    buttonApply,
    isProfile
  } = props;
  
  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={24}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={base.photo} size={120} />
            </div>
          </Row>
          <Form
            form={form}
            name="user-driver"
            layout='horizontal'>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Name"
                    value={base.name}
                    onChange={(e) => onChangeBase(e, 'name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Last Name"
                    value={base.lastname}
                    onChange={(e) => onChangeBase(e, 'lastname')} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Input
                size='large'
                placeholder="Mail"
                value={base.email}
                onChange={(e) => onChangeBase(e, 'email')} />
            </Form.Item>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item label='Birth Date'>
                  <DatePicker
                    size='large'
                    style={{ width: '100%' }}
                    placeholder="Birth Date"
                    value={moment(driver.birthDate)}
                    defaultValue={moment(new Date()).format('MM DD YYYY')}
                    onChange={(obj, key) => handleDatePicker(obj, key, 'birthDate')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Radio.Group
                    value={driver.sex}
                    onChange={(e) => onChangeDriver(e, 'sex')}>
                    <Radio value={0}>F</Radio>
                    <Radio value={1}>M</Radio>
                    <Radio value={2}>Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item>
                  <Input
                    disabled={driver.is_cdl}
                    size='large'
                    placeholder="DLN"
                    value={driver.dln}
                    onChange={(e) => onChangeDriver(e, 'dln')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Experation Date'>
                  <DatePicker
                    size='large'
                    defaultValue={moment(new Date()).format('MM DD YYYY')}
                    value={moment(driver.expDateDln)}
                    placeholder="Experation Date"
                    style={{ width: '100%' }}
                    onChange={(obj, key) => handleDatePicker(obj, key, 'expDateDln')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Area Code"
                    value={driver.areaCode}
                    onChange={(e) => onChangeDriver(e, 'areaCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Phone Number"
                    value={driver.phoneNumber}
                    onChange={(e) => onChangeDriver(e, 'phoneNumber')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Zip Code"
                    value={driver.zipCode}
                    onChange={(e) => onChangeDriver(e, 'zipCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Address"
                    value={driver.address}
                    onChange={(e) => onChangeDriver(e, 'address')} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className='profile-driver__form-small' span={24}>
          <Row gutter={[24]} justify='space-between' >
            <Form.Item label="Years of experience ">
              <InputNumber
                size="large"
                min={0}
                max={100}
                defaultValue={0}
                onChange={(e) => onChangeDriver(e, 'experience')} />
            </Form.Item>
            <Form.Item>
              <Upload {...propsUpload}
                fileList={imageDln}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Row>
          <Form.Item>
            <TextArea
              rows={4}
              size='large'
              placeholder="Telling us about your background"
              value={driver.description}
              onChange={(e) => onChangeDriver(e, 'description')} />
          </Form.Item>
          <Row gutter={[24]} justify='end' align='middle'>
             <Col span={6}>
                {!base.id ? <Button
                  onClick={newDrivers}
                  type='primary'
                  block
                  size='large'>Save Information</Button>
                  : <Button
                  onClick={updateDriver}
                  type='primary'
                  block
                  size='large'>Update Information</Button>
                }
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default driverUser;