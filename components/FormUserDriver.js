import React,{ useState } from 'react';
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
  message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { onChangeDriver, onChangeBase, handleDatePicker } from '@store/reducers/user_reducer';
import moment from 'moment';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'next/router';

const { TextArea } = Input;

function mapStateToProps(state) {
  const { user } = state;
  return {
    base: {
      name: user.name,
      lastname: user.lastname,
      photo: user.photo,
      email: user.email,
    },
    token: user.token,
    driver: user.driver,
    isUserRegistry: state.user.typeUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleBaseProps: (e, key) => dispatch(onChangeBase(e, key)),
    handleDriverProps: (e, key) => dispatch(onChangeDriver(e, key)),
    handleDatePicker: (obj, date, key) => dispatch(handleDatePicker(obj, date, key))
  }
}

const DriverUser = (props) => {
  const { router } = props
  const [form] = Form.useForm();
  const [imageDln, setImage] = useState([])
  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };
  const apply = {
    job: router.query.id,
    company: props.company
  };


  const saveApply = async () =>{
      await axios.post('/api/company/jobs/apply', apply, header)
      .then((response)=>{
        dispatch({type:types.SHOW_SUCCESS, payload:true});
        dispatch({type:types.PROPS_APPLY, payload:false});
      });
  }


  const newDrivers = async () => {
    const { base, driver } = props;
    if (state.imageDln.length > 0) {
      driver.imageDln = state.imageDln[0].response.data.file;
    }
    base.typeUser = 1;
    const fullDriver = { base: base, ...driver };
      dispatch({ type: types.LOADING, payload: true });
      const { data } = await axios.post('/api/driver', fullDriver)
      .then((response)=>{
        console.log('[ user registry succes ]', data.data);
        if(props.isJobs){
          saveApply();
        }
        saveApply
        dispatch({ type: types.LOADING, payload: false });
        props.handleNewDriverProps(response.data);
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
        });
      })
      .catch((err)=>{
        dispatch({ type: types.LOADING, payload: false });
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this user, please try again. "
        });
      })
    }

  const updateDriver = async () => {
    const { base } = props;
    if (imageDln.length > 0) {
      state.driver.imageDln = state.imageDln[0].response.data.file;
    }
    const fullDriver = { base: base, ...props.driver };
    try {
      dispatch({ type: types.LOADING, payload: true });
      const { data } = await axios.patch('/api/driver/' + user._id, fullDriver, header);
      props.handleNewDriverProps(data.data);
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      dispatch({ type: types.LOADING, payload: false });
      console.log('loader false 2', state.loading);
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

  const {
    driver,
    handleBaseProps,
    handleDriverProps,
    handleDatePicker,
    base,
    action,
  } = props;

  return (
    <div className='profile-driver'>
      <Row justify='center'>
        <Col className='profile-driver__form' span={24}>
          <Row justify='center'>
            <div className='avatar'>
              <Avatar src={base.photo} size={120} />
            </div>
          </Row>
          <Form
            form={form}
            name="user-driver"
            layout='horizontal'>
            <Row gutter={[24]} justify='space-between' >
              <Col span={12}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Name"
                    value={base.name}
                    onChange={(e) => handleBaseProps(e, 'name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Last Name"
                    value={base.lastname}
                    onChange={(e) => handleBaseProps(e, 'lastname')} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Input
                size='large'
                placeholder="Mail"
                value={base.email}
                onChange={(e) => handleBaseProps(e, 'email')} />
            </Form.Item>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item label='Birth Date'>
                  <DatePicker
                    size='large'
                    selected={moment(driver.birthDate)}
                    style={{ width: '100%' }}
                    placeholder="Birth Date"
                    onChange={(obj, key) => handleDatePicker(obj, key, 'birthDate')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <Radio.Group
                    value={driver.sex}
                    onChange={(e) => handleDriverProps(e, 'sex')}>
                    <Radio value={0}>F</Radio>
                    <Radio value={1}>M</Radio>
                    <Radio value={2}>Other</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' align='middle'>
              <Col span={12}>
                <Form.Item>
                  <Input
                    disabled={driver.is_cdl}
                    size='large'
                    placeholder="DLN"
                    value={driver.dln}
                    onChange={(e) => handleDriverProps(e, 'dln')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Experation Date'>
                  <DatePicker
                    size='large'
                    selected={moment(driver.expDateDln)}
                    placeholder="Experation Date"
                    style={{ width: '100%' }}
                    onChange={(obj, key) => handleDatePicker(obj, key, 'expDateDln')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Area Code"
                    value={driver.areaCode}
                    onChange={(e) => handleDriverProps(e, 'areaCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Phone Number"
                    value={driver.phoneNumber}
                    onChange={(e) => handleDriverProps(e, 'phoneNumber')} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Zip Code"
                    value={driver.zipCode}
                    onChange={(e) => handleDriverProps(e, 'zipCode')} />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Address"
                    value={driver.address}
                    onChange={(e) => handleDriverProps(e, 'address')} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className='profile-driver__form-small' span={24}>
          <Row gutter={[24]} justify='space-between' >
            <Form.Item label="Years of experience ">
              <InputNumber
                size="large"
                min={0}
                max={100}
                defaultValue={0}
                onChange={(e) => handleDriverProps(e, 'experience')} />
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
          <Form.Item>
            <TextArea
              rows={4}
              size='large'
              placeholder="Telling us about your background"
              value={driver.description}
              onChange={(e) => handleDriverProps(e, 'description')} />
          </Form.Item>
          <Row gutter={[24]} justify='center' align='middle'>
            <Col span={12}>
              {
                props.isUserRegistry ?
                  <Button
                    onClick={newDrivers}
                    type='primary'
                    block
                    size='large'>Save Information</Button> :
                  <Button
                    onClick={updateDriver}
                    type='primary'
                    block
                    size='large'>Update Information</Button>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverUser)); 