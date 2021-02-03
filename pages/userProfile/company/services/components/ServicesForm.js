import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Select, Form, Radio, Upload, Typography } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import useListState from '@hooks/useListState';
import { beforeUpload } from 'components/UploadImages';
import { EmailInput, SelectStateInput } from 'components/inputs';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import AddressInputs from 'components/AddressInput';
const { Text } = Typography;
import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;


const ServicesForm = (props) => {
  const { fields } = props;
  const onFinish = props.createService;
  const [contactList, setContactList] = useState([{ number: '' }]);
  const [serviceList, setServiceList] = useState([{ description: '' }]);
  const TextButton = props.formType === 'create' ? 'Create Job' : 'Save Changes';
  const [form] = Form.useForm();
  const [stateOptions, isFetchingState] = useListState();
  const [cityOptions, setCities] = useState({
    disabled: true,
    options: [],
    all: [],
  });

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

  const onChangeProps = (changedFields) => {
    if (changedFields.length) {
      let state = changedFields[0].name[0] === "state" ? changedFields[0] : false
      if (state) fetchCities(state.value)
    };
  };

  const addNewValue = (type, value) => {
    let newValues = []
    if (type == 'contact') {
      let newValues = [...contactList];
      newValues.push({ number: value });
      setContactList(newValues);
    }
    if (type == 'service') {
      let newValues = [...serviceList];
      newValues.push({ description: value });
      setServiceList(newValues);
    }
  }

  const removeValue = (type, i) => {
    if (type == 'contact') {
      const filtered = contactList.filter((value, index) => {
        return index !== i;
      });
      console.log('filtered', filtered)
      setContactList(filtered);
    }
    if (type == 'service') {
      console.log('filtered', filtered)
      const filtered = contactList.filter((value, index) => {
        return index !== i;
      });
      setServiceList(filtered)
    }
  }

  const handlerCustomInput = (value, index, type) => {
    console.log('index, value, type', index, value, type)
    if (type == 'contact') {
      serviceList.forEach((e, i) => {
        if (index == i) serviceList[i] = { number: value };
      })
    }
    if (type == 'service') {
      serviceList.forEach((e, i) => {
        if (index == i) serviceList[i] = { description: value };
      })
    }
  }
  console.log(serviceList, contactList);
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        fields={fields}
        name={props.formType === 'create' ? "new-job" : "edit-job"}
        initialValues={{ remember: true }}
        onFieldsChange={onChangeProps}
        layout='vertical'>
        <Form.Item
          name="title"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Name is required!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="detail"
          label="Detail"
          rows={2}
          rules={[
            {
              required: true,
              message: 'Detail is required!',
            },
          ]}>
          <TextArea />
        </Form.Item>
        <Row gutter={[16, 16]} justify='space-between' >
          <Col span={12}>
            <EmailInput />
          </Col>
          <Col span={12}>
            <Form.Item
              name="whatsapp"
              label="Contact Number"
              rules={[
                {
                  required: true,
                  message: 'Phone Number is required!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify='space-between' >
          <Col span={12} className="profile-company__services__header__add-new">
            <Form.Item label="Add servises included">
              {
                serviceList.map((e, i) => {
                  return <AddNewProps
                    index={i}
                    value={e.description}
                    addNewValue={addNewValue}
                    handlerCustomInput={handlerCustomInput}
                    type='service'
                    removeValue={props.removeValue} />
                })
              }
            </Form.Item>
          </Col>
          <Col span={12} className="profile-company__services__header__add-new">
            <Form.Item label="Add other contacs">
              {
                contactList.map((e, i) => {
                  return <AddNewProps
                    value={e.number}
                    index={i}
                    handlerCustomInput={props.handlerCustomInput}
                    addNewValue={addNewValue}
                    type='contact'
                    removeValue={removeValue} />
                })
              }
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row gutter={[16, 16]} justify='space-between' >
            <Col span={12}>
              <SelectStateInput />
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
const AddNewProps = (props) => {
  const { type, index, addNewValue, value, removeValue, handlerCustomInput } = props;

  const handlerInput = (ev, index, type) => {
    console.log(ev, index, type)
  }

  return (
    <Row gutter={[16]}>
      <Col span={4} style={{ paddingLeft: 16 }}>
        {
          index > 0 ?
            <Button shape="circle" onClick={() => removeValue(type, index)} type="primary" icon={< MinusOutlined />} />
            :
            <Button shape="circle" onClick={() => addNewValue(type)} type="primary" icon={<PlusOutlined />} />
        }
      </Col>
      <Col span={20}>
        <Form.Item>
          <Input value={value} onChange={(ev) => handlerInput(ev.target.value, index, type)} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default ServicesForm;