import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, Form, Radio, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useListState from '@hooks/useListState';
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    dispatch({ type: types.NEW_PHOTO, payload: [''] });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
    dispatch({ type: types.NEW_PHOTO, payload: [''] });
  }
  return isJpgOrPng && isLt2M;
}

const FormJobs = (props) => {
  const handlerInput = props.formType === 'create' ? props.onFinisCreateJobs : props.onFinisEditJobs;
  const TextButton = props.formType === 'create' ? 'Create Job' : 'Save Changes';
  const [form] = Form.useForm();
  const [stateOptions, isFetchingState] = useListState();
  const [cityOptions, setCities] = useState({
    disabled: true,
    options: [],
    all: [],
  });
  let fields = [];
  if(props.fields){
    console.log(props.fields);
    fields = props.fields.map((field)=>{
      if(field['name'] == "city" || field['name'] == "state"){
        if(typeof field['value'] === 'object'){
          let id = field['value']._id;
          field['value'] = id;
        }
      }
      return field;
    });
  }
  
  const fetchCities = async (stateId) => {
    await axios
      .get(`/api/address/cities/${stateId}`)
      .then((response) => {
        let options = response.data.data
          .sort((a, b) => {
            if (a.cityName < b.cityName) { return -1; }
            if (a.cityName > b.cityName) { return 1; }
            return 0;
          })
          .map((e) => { return { value: e.cityName, id: e._id } })
        let all = response.data.data
        setCities({
          options,
          all,
          disabled: false
        })
      })
      .catch((err) => {
        setCities({
          options: [],
          all: [],
          disabled: true
        })
        console.log(err)
      })
  };


  const onChangeProps = (changedFields) => {
    if (changedFields.length) {
      let state = changedFields[0].name[0] === "state" ? changedFields[0] : false
      if (state) fetchCities(state.value)
    };
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handlerInput}
        fields={fields}
        name= {props.formType === 'create'?"new-job":"edit-job"}
        initialValues={{ remember: true }}
        onFieldsChange={onChangeProps}
        layout='vertical'>
        <Form.Item
          name="title"
          label="Title/ Position name"
          rules={[
            {
              required: true,
              message: 'Name is required!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Job Description"
          rows={4}
          rules={[
            {
              required: true,
              message: 'Description is required!',
            },
          ]}>
          <TextArea />
        </Form.Item>
        <Form.Item
          name="photo"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[
            {
              required: props.formType === 'create'?true:false,
              message: 'Photo is required!',
            },
          ]}
        >
          <Upload {...props.propsUpload}
            fileList={props.newPhoto}
            beforeUpload={beforeUpload}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Row gutter={[16, 16]} justify='space-between' >
          <Col span={4}>
            <Form.Item
              name="areaCode"
              label="Area Code"
              rules={[
                {
                  required: true,
                  message: 'Area code is required!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Phone Number is required!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Email is required!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="time"
          rules={[
            {
              required: true,
              message: 'Time is required!',
            },
          ]}>
          <Radio.Group>
            <Radio value={0}>Part-time</Radio>
            <Radio value={1} >Full-time</Radio>
            <Radio value={2}>Eventual</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Row gutter={[16, 16]} justify='space-between' >
            <Col span={12}>
              <Form.Item label="State / Province / Reagion">
                <Form.Item
                  name={'state'}
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}
                >
                  <Select 
                    placeholder="Select province">
                    {
                      stateOptions.options.map((e, ind) => (<Option key={ind} value={e.id} val>{e.value}</Option>))
                    }
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="City">
                <Form.Item
                  name={'city'}
                  noStyle
                  rules={[{ required: true, message: 'City is required' }]}
                >
                  <Select
                    disabled={cityOptions.disabled}
                    placeholder="Select city"
                    showSearch
                    value= {fields.city}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                      cityOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
                    }
                  </Select>
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Row gutter={[16, 16]} justify='center' >
          <Col span={16}>
            <Button
              htmlType="submit"
              shape="round"
              type='primary'
              block
              size='large'>{TextButton}</Button>
          </Col>
        </Row>
        <Form.Item>
        </Form.Item>
      </Form>
    </>

  )
}

export default FormJobs;