import React, { useState } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';
import { DLNinput, EmailInput } from 'components/inputs';
import { DraggerUpload, ImageProfile } from 'components/UploadImages';
import moment from 'moment';
import { Button, Row, Col, Form, Input, notification, Select, Divider, DatePicker, Radio } from 'antd';

const { Option } = Select;

const FormComponent = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoader] = useState(false);
  const [imageDln, setImageDLN] = useState('');
  const [medicCardImage, setMedicCardImage] = useState('');

  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };

  const createUser = async (fields) => {
    const base = {
      name: fields.name,
      lastname: fields.lastname,
      typeUser: 1,
      email: fields.email,
      companyId: props.userId
    }
    const newUSer = {
      base: base,
      dln: fields.dln,
      expDateDln: fields.expDateDln,
      birthDate: fields.birthDate,
      phoneNumber: fields.phoneNumber,
      sex: fields.sex,
      description: fields.description,
      imageDln: imageDln,
      medicCardImage: medicCardImage
    }

    setLoader(true);
    await axios.post('/api/driver', newUSer, header)
      .then((response) => {
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
        });
        setLoader(false);
        props.router.push('/userProfile/company/staff')
      })
      .catch((err) => {
        console.log('[ user registry error ]', err);
        setLoader(false);
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this user, please try again. "
        });
      })
  }

  const dateFormat = 'MM/DD/YYYY';

  return (
    <Form
      form={form}
      onFinish={createUser}
      layout="vertical"
    >
      <Row gutter={[16]}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <EmailInput />
          <Form.Item
            label='Birth date'
            name="birthDate"
            rules={[
              {
                required: true,
                message: 'Birth date is required!',
              },
            ]}>
            <DatePicker
              defaultValue={moment(moment().format('L'), dateFormat)}
              format={dateFormat}
              style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            label='Sex'
            name="sex"
            rules={[
              {
                required: true,
                message: 'Sex is required!',
              },
            ]}>
            <Radio.Group>
              <Radio value={0}>F</Radio>
              <Radio value={1}>M</Radio>
              <Radio value={2}>Other</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Divider className="dividers" />
        <Col span={12}>
          <DLNinput />
          <DraggerUpload
            label='DLN'
            button='Add photo'
            setDefaultFileList={setImageDLN}
            defaultFileList={imageDln}
            token={props.token} />
        </Col>
        <Col span={12}>
          <Form.Item
            label='Expiration date DLN'
            name="expDateDln"
            rules={[
              {
                required: true,
                message: 'Expiration date is required!',
              },
            ]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <DraggerUpload
            setDefaultFileList={setMedicCardImage}
            defaultFileList={medicCardImage}
            label='Medic card'
            button='Add photo'
            token={props.token} />
        </Col>
        <Divider className="dividers" />
        <Col span={24}>
          <div className="create-user__submit-container">
            <Form.Item>
              <Button htmlType="button">Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                style={{ margin: '0 8px' }}
              >
                Create
              </Button>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </Form>
  );
}


export default withRouter(FormComponent)