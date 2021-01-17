import { Row, Col, Form, Typography, Modal, Button, Rate, Input } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;


const RateDriver = ({ modalVisible, onFinish, modalProps, handleCancel }) => {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        visible={modalVisible}
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
                <Title level={3}> How was your experience with {modalProps.fullname}?</Title>
              </Col>
              <Col span={8}>
                <Form.Item
                  name='ranking'
                  rules={[
                    {
                      required: true,
                      message: 'Ranking is required!',
                    },
                  ]}>
                  <Rate
                    allowHalf
                    allowClear={false} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='comment'
                  rules={[
                    {
                      required: false,
                    },
                  ]}>
                  <TextArea
                    rows={4}
                    placeholder="Describe your experience working with this driver"
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
};

export default RateDriver;