import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Input,
  Avatar,
  Form,
  Button,
  Upload,
  InputNumber,
  Radio,
  DatePicker,
  notification,
  message
} from 'antd';
import { UploadOutlined, RetweetOutlined } from '@ant-design/icons';
import {
  updateUserDrive
} from '@store/reducers/user_reducer';
import { SpinnerComp } from 'components/helpers';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';

const { TextArea } = Input;

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    photo: user.photo || '',
    facebook_id: user.facebook_id || '',
    google_id: user.google_id || '',
    _id: user._id || null,
    token: user.token || null,
    driver: user.driver || {},
    isUserRegistry: state.user.typeUser || null,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
  }
}

const DriverUser = (props) => {
  const { router } = props;
  const [form] = Form.useForm();
  const [imageDln, setImage] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [loading, setLoader] = useState(false);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    let fields = [];

    for (let key in props.user) {
      let inputs = {
        name: [key],
        value: props.user[key]
      }
      fields.push(inputs);
    }

    for (let key in props.user.driver) {
      if (key == "birthDate" || key == "expDateDln") {
        let inputs = {
          name: [key],
          value: moment(props.user.driver[key])
        }
        fields.push(inputs);
      } else {
        let inputs = {
          name: [key],
          value: props.user.driver[key]
        }
        fields.push(inputs);
      }
    }
    setFields(fields);
  }, []);

  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };
  const apply = {
    job: router.query.id,
    company: props.company
  };

  const saveApply = async () => {
    await axios.post('/api/company/jobs/apply', apply, header)
      .then((response) => {
        dispatch({ type: types.SHOW_SUCCESS, payload: true });
        dispatch({ type: types.PROPS_APPLY, payload: false });
      });
  }

  const newDrivers = async () => {
    const { driver, base } = beforeToCreateProfile();
    setLoader(true);
    if (imageDln.length > 0) {
      driver.imageDln = imageDln[0].response.data.file;
    }
    base.photo = props.photo;
    base.typeUser = 1;
    if (props.facebook_id)
      base.facebook_id = props.facebook_id;
    if (props.google_id)
      base.google_id = props.google_id;

    const fullDriver = { base: base, ...driver };
    await axios.post('/api/driver', fullDriver)
      .then((response) => {
        props.handleNewDriverProps(response.data.data);
        if (props.isJobs) {
          saveApply();
        }
        setLoader(false);
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
        });
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

  const updateDriver = async () => {
    const { _id } = props;
    const { driver, base } = beforeToCreateProfile();
    if (imageDln.length > 0) {
      driver.imageDln = imageDln[0].response.data.file;
    }
    const fullDriver = { base: base, ...driver };
    try {
      setLoader(true);
      await axios.patch('/api/driver/' + _id, fullDriver, header)
        .then((response) => {
          props.handleNewDriverProps(response.data.data);
          if (props.isJobs) {
            saveApply();
          }
          setLoader(false);
          notification['success']({
            message: 'Success',
            description:
              "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
          });
        })
    } catch (err) {
      setLoader(false);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save the information correctly , please try again."
      });
      console.log(err);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const propsPhoto = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: `Bearer ${props.token}`
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (photo > 0) {
        try {
          const file = {
            foto: photo[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setPhoto(fileList);
    }
  };

  const propsUpload = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: 'authorization-text'
    },
    async onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (imageDln.length > 0) {
        try {
          const file = {
            foto: imageDln[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setImage(fileList);
    }
  };

  const beforeToCreateProfile = () => {
    let base = {}
    let driver = {}
    fields.forEach((e) => {
      if (
        e.name[0] == 'name' ||
        e.name[0] == 'email' ||
        e.name[0] == 'lastname' ||
        e.name[0] == 'photo' ||
        e.name[0] == 'facebook_id' ||
        e.name[0] == 'google_id'
      ) {
        base[e.name[0]] = e.value
      } else if (
        e.name[0] == 'birthDate' || e.name[0] == 'expDateDln'
      ) {
        driver[e.name[0]] = moment(e.value).format('MM-DD-YYYY')
      }
      else {
        driver[e.name[0]] = e.value
      }
    });
    return {
      driver,
      base
    }
  }

  const onChangeProps = (changedFields, allFields) => {
    setFields(allFields);
  }

  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={24}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={props.photo} size={120} />
              <Upload {...propsPhoto}
                fileList={photo}
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                <Button
                  type='primary'
                  size='small'
                  shape="circle"
                  icon={<RetweetOutlined />} />
              </Upload>
            </div>
          </Row>
          <Form
            fields={fields}
            form={form}
            onFinish={props.isUserRegistry ? updateDriver : newDrivers}
            name="global_state"
            layout='vertical'
            onFieldsChange={onChangeProps}>

            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Name is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
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
            </Row>

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

            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item
                  label='Birth date'
                  name="birthDate"
                  rules={[
                    {
                      required: true,
                      message: 'Birth date is required!',
                    },
                  ]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
            </Row>

            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item
                  label='Dln'
                  name="dln"
                  rules={[
                    {
                      required: true,
                      message: 'dln is required!',
                    },
                  ]}>
                  <InputNumber
                    min={0}
                    max={900000000000000}
                    style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label='Dln expiration'
                  name="expDateDln"
                  rules={[
                    {
                      required: true,
                      message: 'Dln expiration date is required!',
                    },
                  ]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item
                  label='Area code'
                  name="areaCode"
                  rules={[
                    {
                      required: true,
                      message: 'Area code expiration date is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  label='Phone Number'
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Phone number date is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item
                  name='zipCode'
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: 'Zip code is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  name='address'
                  label="Addres"
                  rules={[
                    {
                      required: true,
                      message: 'Address is required!',
                    },
                  ]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Col className='profile-driver__form-small' span={24}>
              <Row gutter={[24]} justify='space-between' >
                <Form.Item
                  name='experience'
                  label="Years of experience"
                  rules={[
                    {
                      required: false,
                    },
                  ]}>
                  <InputNumber
                    min={0}
                    max={100} />
                </Form.Item>
                <Form.Item>
                  <Upload {...propsUpload}
                    fileList={imageDln}
                    beforeUpload={beforeUpload}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Row>
              <Form.Item
                label='Description'
                name='description'>
                <TextArea
                  rows={4}
                  placeholder="Tell us something about your background"
                />
              </Form.Item>
            </Col>
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type='primary'
                  shape="round"
                  htmlType="submit"
                  block
                  size='large'>{props.isUserRegistry ? 'Update Information' : 'Complete profile'} </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={loading} />
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverUser)); 