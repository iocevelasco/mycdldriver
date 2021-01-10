import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Form, Button, InputNumber, Select } from 'antd';
import { updateUserDrive } from '@store/reducers/user_reducer';
import { SpinnerComp } from 'components/helpers';
import useJobsByCompany from '@hooks/useJobsByCompany';
import { DLNinput } from 'components/inputs';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const NewDriverForm = ({ addNewDriver, header, loader, ...props }) => {
  const [form] = Form.useForm();
  const [reload, setReload] = useState(false);
  const [jobsByCompany, isFetching] = useJobsByCompany(header, reload, setReload);

  return (
    <div className='add-driver'>
      <Row justify='center'>
        <Col className='add-driver__form' span={24}>
          <Form
            form={form}
            onFinish={addNewDriver}
            name="new_driver"
            layout='vertical'>

            <Row gutter={[24]} justify='center'  >
              <Col span={22}>
                <Form.Item
                  name="job"
                  label="Select Job"
                  rules={[
                    {
                      required: true,
                      message: 'Job is required!',
                    },
                  ]}>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select Job"
                    optionFilterProp="children"
                  >
                    {
                      jobsByCompany.map(e => {
                        return <Option value={e._id}>{e.title}</Option>
                      })
                    }
                  </Select>
                </Form.Item>
              </Col>
              <Col span={22}>
                <Form.Item
                  name="name"
                  label="Driver name"
                  rules={[
                    {
                      required: true,
                      message: 'Name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={22}>
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Last name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={22}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Email is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={22}>
                <DLNinput />
              </Col>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'>Send invitation </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={isFetching} />
    </div >
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDriverForm)
); 
