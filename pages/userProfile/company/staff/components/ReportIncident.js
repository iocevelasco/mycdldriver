import React, { useState } from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { SpinnerComp } from 'components/helpers';
import { UploadMultiple } from 'components/UploadImages';
import axios from 'axios';

const { TextArea } = Input;

const ReportIncident = (props) => {
  const [form] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [fileList, setFileList] = useState([]);
  const reportIncident = (fields) => {
    console.log(fields);
  }

  return (
    <div className='add-driver'>
      <Row justify='center'>
        <Col className='add-driver__form' span={24}>
          <Form
            form={form}
            onFinish={reportIncident}
            name="report_incident"
            layout='vertical'>

            <Row gutter={[24]} justify='center'>
              <Col span={22}>
                <UploadMultiple
                  fileList={fileList}
                  setFileList={setFileList} />
              </Col>
              <Col span={22}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'Description is required!',
                    },
                  ]}>
                  <TextArea
                    rows={4}
                    placeholder="Tell some detail about your incident"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'>Create incident </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={isFetching} />
    </div >
  )
}

export default ReportIncident;