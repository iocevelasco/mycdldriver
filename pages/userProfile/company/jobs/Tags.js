import React, { useState } from 'react';
import { Row, Col, Button, Input, Select, Form, Radio, Upload, message, Tag } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import ListState from '@hooks/useListState';
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

const TagsComponent = (props) => {
  console.log('props', props);
  const [stateOptions, isFetching] = ListState();
  const [inputVisible, setInputVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();
  const handlerInput = props.formType === 'create' ? props.onFinisCreateJobs : props.onFinisEditJobs;
  console.log('handlerInput', handlerInput);
  const saveInputRef = input => {
    input = input;
  };

  const handleClose = (removedTag, key) => {
    switch (key) {
      case 'create':
        const tags = state.tags.filter(tag => tag !== removedTag);
        dispatch({ type: types.ADD_TAGS, payload: tags });
        break;
      case 'edit':
        const tagsEdit = state.tagsEdit.filter(tag => tag !== removedTag);
        dispatch({ type: types.SET_CURRENT_TAGS, payload: tagsEdit });
        break;
    }
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    dispatch({
      type: types.ADD_TAGS, payload: {
        tags,
        inputVisible: false,
        inputValue: ''
      }
    })
  };

  return (
    <>
      <Form
        form={form}
        onFinish={handlerInput}
        name="new-job"
        initialValues={{ remember: true }}
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
              required: true,
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
        <Row gutter={[4, 16]} justify='space-between' >
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
          <Col span={8}>
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

        <Row gutter={[4, 16]} justify='space-between' >
          <Col span={8}>
            <Form.Item label="State / Province / Reagion">
              <Form.Item
                name={'state'}
                noStyle
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="Select province">
                  {
                    stateOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
                  }
                </Select>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="City">
              <Form.Item
                name={'city'}
                noStyle
                rules={[{ required: true, message: 'City is required' }]}
              >
                <Select
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
        <Col span={6}>
          <Button
            htmlType="submit"
            shape="round"
            type='primary'
            block
            size='large'>Create Job position</Button>
        </Col>
        <Form.Item>
        </Form.Item>
      </Form>
    </>

  )
}

export default TagsComponent;