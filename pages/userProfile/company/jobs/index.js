import React, { useEffect, useReducer } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  Button,
  Typography,
  Input,
  Form,
  Radio,
  Upload,
  message,
  Drawer,
  Tag,
  Card,
  List,
  notification,
  Avatar,
  Divider,
  Image
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import WrapperSection from '../../components/wrapperSection';
import SideNav from '../../components/SideNavAdmin';
import SearchLocation from '../../components/SearchLocationInput';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Text, Title } = Typography
const initialState = {
  loading: true,
  loadingJobsList: true,
  editing: false,
  fields: [],
  fieldsEdit: [],
  newJob: {
    title: '',
    description: '',
    areaCode: '',
    phoneNumber: '',
    email: '',
    city: '',
    time: '',
  },
  editJob: {
    _id: '',
    title: '',
    description: '',
    areaCode: '',
    phoneNumber: '',
    email: '',
    city: '',
    time: '',
  },
  tags: [],
  tagsEdit: [],
  inputVisible: false,
  inputEditVisible: false,
  inputValue: '',
  newPhoto: [],
  editPhoto: [],
  editInputIndex: -1,
  editInputValue: '',
  jobByCompany: [],
  visible: false
}

const types = {
  JOB_DATA: 'JOB_DATA',
  JOB_EDIT_DATA: 'JOB_EDIT_DATA',
  HANDLER_TAGS: 'HANDLER_TAGS',
  ADD_TAGS: 'ADD_TAGS',
  ADD_CURRENT_TAGS: 'ADD_CURRENT_TAGS',
  EDIT_CURRENT_TAG: 'EDIT_CURRENT_TAG',
  SHOW_INPUT_TAG: 'SHOW_INPUT_TAG',
  SHOW_INPUT_TAG_EDIT: 'SHOW_INPUT_TAG_EDIT',
  REMOVE_TAGS: 'remove_tags',
  LOADING: 'LOADING',
  GET_JOBS: 'GET_JOBS',
  EDIT_JOB: 'EDIT_JOB',
  SHOW_DRAWER: 'SHOW_DRAWER',
  SET_CURRENT_TAGS: 'SET_CURRENT_TAGS',
  LOADING_GET_JOBS: 'LOADING_GET_JOBS',
  NEW_PHOTO: 'NEW_PHOTO',
  EDIT_PHOTO: 'EDIT_PHOTO',
  EDITING: 'EDITING',
  NEW_FIELDS: 'NEW_FIELDS',
  EDIT_FIELDS: 'EDIT_FIELDS'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.JOB_DATA:
      return { ...state, newJob: action.payload, loading: false }
    case types.JOB_EDIT_DATA:
      return { ...state, editJob: action.payload, loading: false }
    case types.HANDLER_TAGS:
      return { ...state, inputValue: action.payload }
    case types.EDIT_CURRENT_TAG:
      return { ...state, editInputValue: action.payload }
    case types.ADD_TAGS:
      return { ...state, ...action.payload }
    case types.ADD_CURRENT_TAGS:
      return { ...state, ...action.payload }
    case types.SET_CURRENT_TAGS:
      return { ...state, tagsEdit: action.payload }
    case types.REMOVE_TAGS:
      return { ...state, tags: action.payload }
    case types.SHOW_INPUT_TAG:
      return { ...state, inputVisible: action.payload }
    case types.SHOW_INPUT_TAG_EDIT:
      return { ...state, inputEditVisible: action.payload }
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.GET_JOBS:
      return { ...state, jobByCompany: action.payload, loadingJobsList: false, loading: false }
    case types.EDIT_JOB:
      return { ...state, editJob: action.payload }
    case types.SHOW_DRAWER:
      return { ...state, visible: !state.visible }
    case types.LOADING_GET_JOBS:
      return { ...state, loadingJobsList: !state.loadingJobsList }
    case types.NEW_PHOTO:
      return { ...state, newPhoto: action.payload }
    case types.EDIT_PHOTO:
      return { ...state, editPhoto: action.payload }
    case types.EDITING:
      return { ...state, editing: !state.editing }
    case types.NEW_FIELDS:
      return { ...state, fields: action.payload }
    case types.EDIT_FIELDS:
      return { ...state, fieldsEdit: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

// CONNECT WITH REDUX
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const CompanyJobView = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = props;

  const configSection = {
    title: 'Jobs',
    user: props.user,
    isLoading: state.loading,
    currentLocation: '1',
    bgActive: false
  }

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const { TextArea } = Input;

  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };


  useEffect(() => {
    fetchJobPositionData();
  }, []);

  const fetchJobPositionData = async () => {
    try {
      let newJob = { title: '', description: '', areaCode: '', logo: '', phoneNumber: '', email: '', city: '', time: '' }
      dispatch({ type: types.JOB_DATA, payload: newJob });
      dispatch({ type: types.LOADING_GET_JOBS });
      dispatch({ type: types.NEW_PHOTO, payload: '' });
      const { data } = await axios.get('/api/company/jobs/private', header);
      console.log('[ JOBS LIST ]', data.data);
      dispatch({ type: types.GET_JOBS, payload: data.data });
    } catch (err) {
      console.log('fetchJobPositionData', err);
    }
  }

  const updateQuery = (formatted_address) => {
    let newJob = state.newJob;
    newJob['city'] = formatted_address;
    dispatch({ type: types.JOB_DATA, payload: newJob });
  }

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

  const onChangeNewJob = (changedFields, allFields) => {
    dispatch({ type: types.NEW_FIELDS, payload: allFields });
  }

  const onChangeEditJob = (changedFields, allFields) => {
    dispatch({ type: types.EDIT_FIELDS, payload: allFields });
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
      if (state.editing) {
        if (state.editPhoto.length > 0) {
          try {
            const file = {
              foto: state.editPhoto[0].response.data.file
            };
            await axios.post(`/api/files/delete`, file);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: types.EDIT_PHOTO, payload: fileList });
      } else {
        if (state.newPhoto.length > 0) {
          try {
            const file = {
              foto: state.newPhoto[0].response.data.file
            };
            await axios.post(`/api/files/delete`, file);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({ type: types.NEW_PHOTO, payload: fileList });
      }

    }
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

  const handlerTags = (e, key) => {
    switch (key) {
      case 'create':
        return dispatch({ type: types.HANDLER_TAGS, payload: e.target.value });
      case 'edit':
        return dispatch({ type: types.EDIT_CURRENT_TAG, payload: e.target.value });
      default:
        return dispatch({ type: types.HANDLER_TAGS, payload: e.target.value });
    }
  }

  const showInput = (key) => {
    switch (key) {
      case 'create':
        dispatch({ type: types.SHOW_INPUT_TAG, payload: true });
        break;
      case 'edit':
        dispatch({ type: types.SHOW_INPUT_TAG_EDIT, payload: true });
        break;
      default:
        dispatch({ type: types.SHOW_INPUT_TAG, payload: true });
        break;
    }
  };

  const saveInputRef = input => {
    input = input;
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

  const handleInputEditConfirm = () => {
    const { editInputValue } = state;
    let { tagsEdit } = state;

    if (editInputValue && tagsEdit.indexOf(editInputValue) === -1) {
      tagsEdit = [...tagsEdit, editInputValue];
    }
    dispatch({
      type: types.ADD_CURRENT_TAGS, payload: {
        tagsEdit,
        inputEditVisible: false,
        editInputValue: ''
      }
    })
  };

  const deleteJob = async (id) => {
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.delete(`/api/company/jobs/${id}`, header);
      fetchJobPositionData();
      notification['success']({
        message: 'Success',
        description:
          "Done! the position has been deleted."
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't delete this position, please try again."
      });
    }
  };

  const editJob = (job) => {
    try {
      const tagsEdit = job.tags.map((tag) => tag.name);
      dispatch({ type: types.EDIT_JOB, payload: job });
      dispatch({ type: types.SET_CURRENT_TAGS, payload: tagsEdit });
      beforeEditJob(job);
      dispatch({ type: types.SHOW_DRAWER });
      dispatch({ type: types.EDITING });
    } catch (e) {
      console.log(e);
    }
  }

  const beforeEditJob = (job) => {
    let fields = [];
    for (let key in job) {
      let inputs = {
        name: [key],
        value: job[key]
      }
      fields.push(inputs);
    }
    dispatch({ type: types.EDIT_FIELDS, payload: fields });
  }

  const beforeToCreateJob = (fields, tags, city) => {
    let newJob = {};
    let tagsJob = {};

    fields.forEach((e) => {
      newJob[e.name[0]] = e.value
    });

    if (tags) {
      tagsJob = tags.map((tag) => {
        return { name: tag }
      });
    }

    if (city) {
      newJob.city = city;
    } else if (!newJob.city) {
      notification['error']({
        message: 'error',
        description:
          "Sorry! The city field is required. "
      });
      return false;
    }

    newJob.tags = tagsJob;
    return newJob;
  }

  const newCompanyJob = async () => {
    const newJob = beforeToCreateJob(state.fields, state.tags, state.newJob.city);
    if (!newJob) return;
    if (state.newPhoto.length > 0) {
      newJob.logo = state.newPhoto[0].response.data.file;
    }
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.post('/api/company/jobs', newJob, header);
      fetchJobPositionData();
      dispatch({ type: types.NEW_FIELDS, payload: {} });
      notification['success']({
        message: 'Success',
        description:
          "Success ! Your position has been created"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't create this position, please try again. "
      });
    }
  };

  const updateCompanyJob = async () => {
    const editJob = beforeToCreateJob(state.fieldsEdit, state.tagsEdit);
    dispatch({ type: types.SHOW_DRAWER });
    dispatch({ type: types.LOADING, payload: true });
    if (state.editPhoto.length > 0) {
      editJob.logo = state.editPhoto[0].response.data.file;
    }
    try {
      await axios.patch('/api/company/jobs/' + state.editJob._id, editJob, header);
      fetchJobPositionData();
      dispatch({ type: types.LOADING, payload: false });
      dispatch({ type: types.EDIT_PHOTO, payload: [] });
      notification['success']({
        message: 'Success',
        description:
          "Success ! Your position has been edited correctly"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save changes, please try again"
      });
    }
  };

  const wrapperForm = {
    marginTop: 16,
  }

  const wrapperList = {
    marginBottom: 24,
  }
  return (
    <>
      <MainLayout {...configSection}>
        <Row>
          <SideNav />
          <Col span={18} className="profile-company__jobs">
            {/* // CRUM JOBS */}
            <WrapperSection row={16} styles={wrapperForm}>
              <div className="title" >
                <Title level={3}> Create and edit your position </Title>
                <Text> Fill the form and publish a job search, wich will we seen by our drivers</Text>
              </div>
              <Divider />
              <Form
                form={form}
                onFinish={newCompanyJob}
                name="new-job"
                initialValues={{ remember: true }}
                layout='vertical'
                onFieldsChange={onChangeNewJob}>
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
                    console.log('Upload event:', e);

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
                  <Upload {...propsUpload}
                    fileList={state.newPhoto}
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
                <SearchLocation updateQuery={updateQuery} />
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
                  {
                    state.tags.map((tag, index) => {
                      const tagElem = (
                        <Tag
                          className="edit-tag"
                          key={tag}
                          closable={index !== 0}
                          onClose={() => handleClose(tag, 'create')}
                        >
                          <span>{tag}</span>
                        </Tag>
                      );
                      return tagElem;
                    })}
                  {state.inputVisible && (
                    <Input
                      ref={saveInputRef}
                      type="text"
                      size="small"
                      className="tag-input"
                      value={state.inputValue}
                      onChange={(e) => handlerTags(e, 'create')}
                      onPressEnter={handleInputConfirm}
                      onBlur={handleInputConfirm}
                    />
                  )}
                  {!state.inputVisible && (
                    <Tag className="site-tag-plus" onClick={() => showInput('create')}>
                      <PlusOutlined /> New Tag
                    </Tag>
                  )}
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
            </WrapperSection>


            {/* // LIST JOBS */}
            <WrapperSection row={20} styles={wrapperList}>
              <Card>
                <List
                  itemLayout="vertical"
                  size="large"
                  loading={state.loadingJobsList}
                  rowKey='_id'
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 5,
                  }}
                  dataSource={state.jobByCompany}
                  renderItem={(item, ind) => (
                    <List.Item
                      key={ind}
                      actions={[
                        <Button style={{ borderRadius: 50 }} onClick={() => deleteJob(item._id)} icon={<DeleteOutlined />}>Delete</Button>,
                        <Button style={{ borderRadius: 50 }} onClick={() => editJob(item)} icon={<EditOutlined />}>Edit</Button>,
                        <Link href={{
                          pathname: '/userProfile/company/candidate',
                          query: { id: item._id },
                        }}
                        > View candidate </Link>
                      ]}>
                      <List.Item.Meta
                        avatar={<Avatar size={80} shape='square' src={item.company.photo} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={
                          <div className='list-job-container'>
                            <div className='text'>
                              <Text> Company Name  | <Text strong> {item.company.tradename}  </Text> </Text>
                              <Text> Address  | <Text strong> {item.city}  </Text> </Text>
                              <Text> {item.areaCode}-{item.phoneNumber} | {item.email}</Text>
                              <Text> Description | <Text strong> {item.description}  </Text> </Text>
                              <div>
                                {
                                  item.tags.map((e, i) => {
                                    return <Tag> {e.name} </Tag>
                                  })
                                }
                              </div>
                            </div>
                            <div className='image'>
                              <Image
                                width={200}
                                height={200}
                                src={item.logo || ''}
                                fallback="data:image/png;base64,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"
                              />
                            </div>
                          </div>
                        }
                      />
                      {item.content}
                    </List.Item>)}
                />
              </Card>
            </WrapperSection>
          </Col>
        </Row>
        <Drawer
          title={`Edit Job`}
          placement="right"
          closable={true}
          width={680}
          onClose={() => {
            dispatch({ type: types.SHOW_DRAWER });
            dispatch({ type: types.EDITING });
            dispatch({ type: types.EDIT_PHOTO, payload: [] });
          }}
          visible={state.visible}>
          <Form
            form={editForm}
            fields={state.fieldsEdit}
            onFinish={updateCompanyJob}
            name="edit-job"
            initialValues={{ remember: true }}
            layout='vertical'
            onFieldsChange={onChangeEditJob}>
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
            <Form.Item>
              <Upload {...propsUpload}
                fileList={state.editPhoto}
                beforeUpload={beforeUpload}
              >
                <Button icon={<UploadOutlined />}>Click to Upload image</Button>
              </Upload>
            </Form.Item>
            <Row gutter={[24]} justify='space-between' >
              <Col span={6}>
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
              <Col span={18}>
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
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: 'City is required!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Radio.Group
                value={state.editJob.time}
                onChange={(e) => onChangeEditJob(e, 'time')}>
                <Radio value={0}>Part-time</Radio>
                <Radio value={1}>Full-time</Radio>
                <Radio value={2}>Eventual</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              {
                state.tagsEdit.map((tag, index) => {
                  const tagElem = (
                    <Tag
                      className="edit-tag"
                      key={tag}
                      closable={index !== 0}
                      onClose={() => handleClose(tag, 'edit')}
                    >
                      <span>{tag}</span>
                    </Tag>
                  );
                  return tagElem;
                })}
              {state.inputEditVisible && (
                <Input
                  ref={saveInputRef}
                  type="text"
                  size="large"
                  value={state.editInputValue}
                  onChange={(e) => handlerTags(e, 'edit')}
                  onPressEnter={handleInputEditConfirm}
                  onBlur={handleInputEditConfirm}
                />
              )}
              {!state.inputEditVisible && (
                <Tag onClick={() => showInput('edit')}>
                  <PlusOutlined /> New Tag
                </Tag>
              )}
            </Form.Item>
            <Col span={6}>
              <Button
                htmlType="submit"
                type='primary'
                block
                size='large'>Save Information</Button>
            </Col>
            <Form.Item>
            </Form.Item>
          </Form>
        </Drawer>
      </MainLayout >
    </>
  )
}

export default withRouter(connect(mapStateToProps)(CompanyJobView));