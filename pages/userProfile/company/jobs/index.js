import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from '../../../../components/layout';
import {
  Row,
  Col,
  Button,
  Typography,
  Input,
  Form,
  DatePicker,
  Radio,
  Select,
  Tag,
  Card,
  List,
  notification,
  Avatar,
  Drawer
} from 'antd';
import { withRouter } from 'next/router';
import axios from 'axios';
import WrapperSection from '../../components/wrapperSection';
import SideNav from '../../components/SideNavAdmin';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography
const initialState = {
  loading: false,
  newJob: {
    title: '',
    description: '',
    city: '',
    time: '',
  },
  editJob: {
    _id: '',
    title: '',
    description: '',
    city: '',
    time: '',
  },
  tags: [],
  tagsEdit: [],
  inputVisible: false,
  inputEditVisible: false,
  inputValue: '',
  editInputIndex: -1,
  editInputValue: '',
  jobByCompany:[],
  visible:false
}

const types = {
  JOB_DATA: 'carousel_data',
  JOB_EDIT_DATA: 'JOB_EDIT_DATA',
  HANDLER_TAGS:'HANDLER_TAGS',
  ADD_TAGS:'ADD_TAGS',
  ADD_CURRENT_TAGS:'ADD_CURRENT_TAGS',
  EDIT_CURRENT_TAG:'EDIT_CURRENT_TAG',
  SHOW_INPUT_TAG:'SHOW_INPUT_TAG',
  SHOW_INPUT_TAG_EDIT:'SHOW_INPUT_TAG_EDIT',
  REMOVE_TAGS:'remove_tags',
  LOADING: 'LOADING',
  GET_JOBS: 'GET_JOBS',
  EDIT_JOB: 'EDIT_JOB',
  SHOW_DRAWER:'SHOW_DRAWER',
  SET_CURRENT_TAGS: 'SET_CURRENT_TAGS'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.JOB_DATA:
      return { ...state, newJob: action.payload, loading: false }
    case types.JOB_EDIT_DATA:
      return { ...state, editJob: action.payload, loading: false }
    case types.HANDLER_TAGS:
      return { ...state, inputValue:action.payload }
    case types.EDIT_CURRENT_TAG:
      return { ...state, editInputValue:action.payload }
    case types.ADD_TAGS:
      return { ...state, ...action.payload}
    case types.ADD_CURRENT_TAGS:
      return { ...state, ...action.payload}
    case types.SET_CURRENT_TAGS:
      return { ...state, tagsEdit: action.payload}
    case types.REMOVE_TAGS:
      return { ...state, tags:action.payload }
    case types.SHOW_INPUT_TAG:
      return { ...state, inputVisible:action.payload }
    case types.SHOW_INPUT_TAG_EDIT:
      return { ...state, inputEditVisible:action.payload }
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.GET_JOBS:
      return { ...state, jobByCompany: action.payload, loading: false }
    case types.EDIT_JOB:
      return { ...state, editJob: action.payload }
    case types.SHOW_DRAWER:
      return { ...state, visible:!state.visible }
    default:
      throw new Error('Unexpected action');
  }
}

const Jobs = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  
  useEffect(()=>{
    fetchJobPositionData();
  },[])
  
  const fetchJobPositionData = async () => {
    try{
      const {data} = await axios.get('/api/company/jobs/private', header);
      dispatch({ type: types.GET_JOBS, payload: data.data });
    }catch(err){
      console.log(err);
    }
  }

  const onChangeJob = (e, key) => {
    let newJob = state.newJob;
    let value = "";
    value = e.target.value;
    newJob[key] = value;
    dispatch({ type: types.JOB_DATA, payload: newJob });
  }

  const onChangeEditJob = (e, key) => {
    let editJob = state.editJob;
    let value = "";
    value = e.target.value;
    editJob[key] = value;
    dispatch({ type: types.JOB_EDIT_DATA, payload: editJob });
  }

  const handleClose = (removedTag, key) => {
    switch(key){
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
    switch(key){
      case 'create':
        return dispatch({ type: types.HANDLER_TAGS, payload: e.target.value });
      case 'edit':
        return dispatch({ type: types.EDIT_CURRENT_TAG, payload: e.target.value });
      default:
        return dispatch({ type: types.HANDLER_TAGS, payload: e.target.value });
    }
  }

  const showInput = (key) => {
    switch(key){
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
    dispatch({ type: types.ADD_TAGS, payload:{
      tags,
      inputVisible: false,
      inputValue: '',
    } })
  };

  const handleInputEditConfirm = () => {
    const { editInputValue } = state;
    let { tagsEdit } = state;

    if (editInputValue && tagsEdit.indexOf(editInputValue) === -1) {
      tagsEdit = [...tagsEdit, editInputValue];
    }
    dispatch({ type: types.ADD_CURRENT_TAGS, payload:{
      tagsEdit,
      inputEditVisible: false,
      editInputValue: '',
    } })
  };

  const deleteJob = async (id) => {
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.delete(`/api/company/jobs/${id}`, header);
      fetchJobPositionData();
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    }
  };
  
  const editJob = (job) => {
    try{
      const tagsEdit = job.tags.map((tag)=> tag.name);
      dispatch({type: types.EDIT_JOB, payload:job});
      dispatch({type: types.SET_CURRENT_TAGS, payload: tagsEdit });
      dispatch({type: types.SHOW_DRAWER});
    }catch(e){
      console.log(e);
    }
  }

  const newCompanyJob = async () => {
    const { newJob, tags } = state;
    let tagsJob = tags.map((tag)=>{
      return {name: tag}
    });
    newJob.tags = tagsJob;
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.post('/api/company/jobs', newJob, header);
      fetchJobPositionData();

      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    }
  };

  const updateCompanyJob = async () => {
    const { editJob, tagsEdit } = state;
    let tagsJob = tagsEdit.map((tag)=>{
      return {name: tag}
    });
    editJob.tags = tagsJob;
    dispatch({type: types.SHOW_DRAWER});
    dispatch({ type: types.LOADING, payload: true });
    try {
      await axios.patch('/api/company/jobs/' + editJob._id, editJob, header);
      fetchJobPositionData();
      dispatch({ type: types.LOADING, payload: false });
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    } catch (err) {
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "it's done!. You can now start browsing our page. IF you need to edit you profile you can do it here!"
      });
    }
  };

  const wrapperForm = {
    marginTop:16,
  }

  const wrapperList = {
    marginBottom:24,
  }

  return (
    <>
      <MainLayout title='Jobs' user={user} loading={state.loading}>
        <Row>
          <SideNav typeUser={user.typeUser} /> 
          <Col span={20}>
             {/* // CRUM JOBS */}
            <WrapperSection row={12} styles={wrapperForm}>
              <Form
                form={form}
                name="user-driver"
                initialValues={{ remember: true }}
                layout='horizontal'>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Name"
                    value={state.newJob.title}
                    onChange={(e) => onChangeJob(e, 'title')} />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    rows={4}
                    size='large'
                    placeholder="Description"
                    value={state.newJob.description}
                    onChange={(e) => onChangeJob(e, 'description')} />
                </Form.Item>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="City"
                    value={state.newJob.city}
                    onChange={(e) => onChangeJob(e, 'city')} />
                </Form.Item>
                <Form.Item>
                  <Radio.Group
                    value={state.newJob.time}
                    onChange={(e) => onChangeJob(e, 'time')}>
                    <Radio value={0}>Part-time</Radio>
                    <Radio value={1}>Full-time</Radio>
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
                      size="large"
                      value={state.inputValue}
                      onChange={(e) => handlerTags(e, 'create')}
                      onPressEnter={handleInputConfirm}
                      onBlur={handleInputConfirm}
                    />
                  )}
                  {!state.inputVisible && (
                    <Tag onClick={() => showInput('create')}>
                      <PlusOutlined /> New Tag
                    </Tag>
                  )}
                </Form.Item>
                  <Col span={6}>
                    <Button
                      onClick={newCompanyJob}
                      type='primary'
                      block
                      size='large'>Save Information</Button>
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
                    <Button onClick={()=>deleteJob(item._id)} icon={<DeleteOutlined />}>Delete</Button>,
                    <Button onClick={()=>editJob(item)} icon={<EditOutlined />}>Edit</Button>,
                  ]}
                 >
                  <List.Item.Meta
                    avatar={<Avatar size={80} src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={
                      <div>
                       <Text strong> {item.city} </Text>
                       <Text> {item.description}</Text>
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
          onClose={()=> dispatch({type:types.SHOW_DRAWER})}
          visible={state.visible}>
       <Form
                form={form}
                name="user-driver"
                initialValues={{ remember: true }}
                layout='horizontal'>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="Name"
                    value={state.editJob.title}
                    onChange={(e) => onChangeEditJob(e, 'title')} />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    rows={4}
                    size='large'
                    placeholder="Description"
                    value={state.editJob.description}
                    onChange={(e) => onChangeEditJob(e, 'description')} />
                </Form.Item>
                <Form.Item>
                  <Input
                    size='large'
                    placeholder="City"
                    value={state.editJob.city}
                    onChange={(e) => onChangeEditJob(e, 'city')} />
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
                      onClick={updateCompanyJob}
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

export default withRouter(Jobs);