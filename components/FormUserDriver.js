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
import { onChangeDriver, onChangeBase, handleDatePicker } from '@store/reducers/user_reducer';
import moment from 'moment';
import { connect } from 'react-redux';

const { TextArea } = Input;

function mapStateToProps(state) {
  const { user } = state;
  return {
    base:{
      name: user.name,
      lastname: user.lastname,
      photo: user.photo,
      email: user.email,
    },
    driver: user.driver,
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleBaseProps:(e,key) => dispatch(onChangeBase(e,key)),
    handleDriverProps:(e,key) => dispatch(onChangeDriver(e,key)),
    handleDatePicker:(obj, date, key) => dispatch(handleDatePicker(obj, date, key))
  }
}

const DriverUser = (props) => {
  const [form] = Form.useForm();

  const { 
    driver, 
    handleBaseProps, 
    handleDriverProps, 
    handleDatePicker,
    newDrivers, 
    updateDriver, 
    base, 
    beforeUpload, 
    propsUpload, 
    imageDln,
    action,
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
                    onChange={(e) => handleBaseProps(e, 'name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Last Name"
                    value={base.lastname}
                    onChange={(e) => handleBaseProps(e, 'lastname')} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Input
                size='large'
                placeholder="Mail"
                value={base.email}
                onChange={(e) => handleBaseProps(e, 'email')} />
            </Form.Item>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item label='Birth Date'>
                  <DatePicker
                    size='large'
                    selected={moment(driver.birthDate)}
                    style={{ width: '100%' }}
                    placeholder="Birth Date"
                    onChange={(obj, key) => handleDatePicker(obj, key, 'birthDate')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Radio.Group
                    value={driver.sex}
                    onChange={(e) => handleDriverProps(e, 'sex')}>
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
                    onChange={(e) => handleDriverProps(e, 'dln')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Experation Date'>
                  <DatePicker
                    size='large'
                    selected={moment(driver.expDateDln)}
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
                    onChange={(e) => handleDriverProps(e, 'areaCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Phone Number"
                    value={driver.phoneNumber}
                    onChange={(e) => handleDriverProps(e, 'phoneNumber')} />
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
                    onChange={(e) => handleDriverProps(e, 'zipCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Address"
                    value={driver.address}
                    onChange={(e) => handleDriverProps(e, 'address')} />
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
                onChange={(e) => handleDriverProps(e, 'experience')} />
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
              onChange={(e) => handleDriverProps(e, 'description')} />
          </Form.Item>
          <Row gutter={[24]} justify='center' align='middle'>
             <Col span={12}>
                  {action}
              </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(DriverUser); 