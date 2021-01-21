import { Row, Col, Form, Typography, Modal, Button, Input } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

const UnlinkDriverJob = ({ visible, onFinish, modalProps, handleCancel }) => {
    const [form] = Form.useForm();

    return (
        <>
          <Modal
            visible={visible}
            title={modalProps.jobTitle}
            onCancel={handleCancel}
            footer={null}
          >
            <Row>
              <Form
                form={form}
                onFinish={onFinish}
                name="form_ranking"
                layout='vertical'>
                <Row gutter={[24]} justify='center'>
                  <Col span={24}>
                    <Title level={3}> Are you sure you want to unlink {modalProps.fullname}?</Title>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name='description'
                      rules={[
                        {
                          required: true,
                          message: 'Please indicate the reason for the termination!'
                        },
                      ]}>
                      <TextArea
                        rows={4}
                        placeholder="Indicate the reason or cause for termination"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24]} justify='center' align='middle'>
                  <Col span={12}>
                    <Button
                      htmlType="submit"
                      type='primary'
                      style={{ marginTop: 40 }}
                      shape="round"
                      block
                      size='large'>Send</Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Modal>
        </>
      )
}

export default UnlinkDriverJob;