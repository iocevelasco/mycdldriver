import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, Form, Radio, Upload, message, Switch } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import useListState from '@hooks/useListState';
import { beforeUpload } from 'components/UploadImages';
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;


const FormJobs = (props) => {
  const handlerInput = props.formType === 'create' ? props.onFinisCreateJobs : props.ediJob;
  const TextButton = props.formType === 'create' ? 'Create Job' : 'Save Changes';
  const [form] = Form.useForm();
  const [stateOptions, isFetchingState] = useListState();
  const [cityOptions, setCities] = useState({
    disabled: true,
    options: [],
    all: [],
  });

  const onRemove = (file) => {
    props.setImage([]);
  }

  const uploadImage = async options => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("logo", file);
    try {
      const res = await axios.post(
        '/api/files',
        fmData,
      );
      onSuccess(res.data.data.file);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
    }
  };

  let fields = [];
  if (props.fields) {
    fields = props.fields.map((field) => {
      if (field['name'] == "city" || field['name'] == "state") {
        if (typeof field['value'] === 'object') {
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
        name={props.formType === 'create' ? "new-job" : "edit-job"}
        initialValues={{ remember: true }}
        onFieldsChange={onChangeProps}
        layout='vertical'>{console.log(fields)}
        <Form.Item name="_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
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
                  type: "email",
                  message: 'Enter a valid email address',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify='space-between' >
          <Col span={12}>
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
          </Col>
        </Row>
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
          <Row gutter={[16, 16]} justify='center' >
            <Col span={12}>
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
                    required: props.formType === 'create' ? true : false,
                    message: 'Photo is required!',
                  },
                ]}
              >
                <Upload {...props.propsUpload}
                  fileList={props.newPhoto}
                  onChange={props.handleOnChangeImage}
                  customRequest={uploadImage}
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}
                >
                  <Button
                    style={{ width: '300px' }}
                    type='secondary'
                    shape="round"
                    size="large"
                    block
                    icon={<PictureOutlined />}>Click to Upload Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Row justify='center' >
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