import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Form,
  DatePicker,
  Radio,
  Select,
  Tag,
  Card
} from 'antd';
import { withRouter } from 'next/router';
import axios from 'axios';
import WrapperSection from '../../../../components/wrapperSection';
import SideNav from '../../components/SideNavAdmin';
import { PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const initialState = {
  loading: false,
  newJob: {
    title: '',
    description: '',
    city: '',
    time: '',
  },
  tags: [],
  inputVisible: false,
  inputValue: '',
  editInputIndex: -1,
  editInputValue: '',
}

const types = {
  JOB_DATA: 'carousel_data',
  HANDLER_TAGS:'handler_tag',
  ADD_TAGS:'add_tags',
  EDIT_CURRENT_TAG:'edit_current_tags',
  SHOW_INPUT_TAG:'show_input_tag',
  REMOVE_TAGS:'remove_tags'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.JOB_DATA:
      return { ...state, base: action.payload, loading: false }
    case types.HANDLER_TAGS:
      return { ...state, inputValue:action.payload }
    case types.EDIT_CURRENT_TAG:
      return { ...state, editInputValue:action.payload }
    case types.ADD_TAGS:
      return { ...state, ...action.payload}
    case types.REMOVE_TAGS:
      return { ...state, tags:action.payload }
    case types.SHOW_INPUT_TAG:
      return { ...state, inputVisible:action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const Jobs = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  console.log('state', state.newJob);


  const onChangeJob = (e, key) => {
    let newJob = state.newJob;
    let value = "";
    value = e.target.value;
    newJob[key] = value;
    dispatch({ type: types.JOB_DATA, payload: newJob });
  }

  const handleClose = removedTag => {
    const tags = state.tags.filter(tag => tag !== removedTag);
    dispatch({ type: types.ADD_TAGS, payload: tags });
  };

  const handlerTags = (e, key) => {
    if(key == 'create'){
      return dispatch({ type: types.HANDLER_TAGS, payload: e.target.value });
    }
  }

  const showInput = () => {
    dispatch({ type: types.SHOW_INPUT_TAG, payload: true });
  };

  const handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
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

  const stylesWrapper = {
    marginTop:16,
  }

  return (
    <>
      <MainLayout title='Jobs' user={user} loading={state.loading}>
        <Row>
          <SideNav typeUser={user.typeUser} /> 
          <Col span={20}>
            <WrapperSection row={12} styles={stylesWrapper}>
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
                    onChange={(e) => onChangeJob(e, 'name')} />
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
                      onClose={() => handleClose(tag)}
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
                    <Tag onClick={showInput}>
                      <PlusOutlined /> New Tag
                    </Tag>
                  )}
                </Form.Item>
              </Form>
            </WrapperSection>
          </Col>
        </Row>
      </MainLayout >
    </>
  )
}

export default withRouter(Jobs);