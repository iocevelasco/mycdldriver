import React, { useState } from 'react';
import { Row, Col, Input, Form, Button, notification } from 'antd';
import { SpinnerComp } from 'components/helpers';
import { UploadMultiple } from 'components/UploadImages';
import axios from 'axios';

const { TextArea } = Input;

const ReportIncident = (props) => {
  console.log('PROPS', props);
  const [form] = Form.useForm();
  const [isFetching, setIsFetching] = useState(false);
  const [fileList, setFileList] = useState([]);

  const reportIncident = async (fields) => {
    const { description } = fields;
    let files = fileList.map((item) => {
      return {url: item.response};
    });
    let newReport = {
      images: files,
      driver: props.user.id,
      job: props.job._id,
      description: description
    };
    await axios.post('/api/incident', newReport, props.header)
      .then((response) => {
        console.log(response);
        notification['success']({
          message: 'Success',
          description:
            "Congratulation! Incident created successfully"
        });
        setFileList([]);
        form.resetFields();
        props.closeDrawer();
      })
      .catch((err) => {
        console.log(err);
        notification['error']({
          message: 'Error',
          description:
            "An error occurred while creating the incident, please try again"
        });
      })
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