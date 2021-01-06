import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Typography, message, Drawer, Button, notification, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import { WrapperSection } from 'components/helpers';
import useJobsByCompany from '@hooks/useJobsByCompany';
import SideNav from '../../components/SideNavAdmin';
import JobsList from './ListJobs';
import FormJobs from './FormJobs';
import "./styles.less";
const { Text, Title } = Typography
const initialState = {
  loading: true,
  loadingJobsList: true,
  fields: [],
  fieldsEdit: [],
  newPhoto: [],
  editPhoto: [],
  visible: false,
  visible_create: false,
}

const types = {
  LOADING: 'LOADING',
  SHOW_DRAWER: 'SHOW_DRAWER',
  NEW_PHOTO: 'NEW_PHOTO',
  EDIT_PHOTO: 'EDIT_PHOTO',
  EDITING: 'EDITING',
  NEW_FIELDS: 'NEW_FIELDS',
  EDIT_FIELDS: 'EDIT_FIELDS',
  OPEN_DRAWER_CREATE: 'OPEN_DRAWER_CREATE',
  CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: action.payload }
    case types.SHOW_DRAWER:
      return {
        ...state,
        visible: !state.visible,
        fields: action.payload
      }
    case types.NEW_PHOTO:
      return { ...state, newPhoto: action.payload }
    case types.EDIT_PHOTO:
      return { ...state, editPhoto: action.payload }
    case types.EDITING:
      return { ...state, editing: !state.editing }
    case types.OPEN_DRAWER_CREATE:
      return { ...state, visible_create: !state.visible_create }
    case types.CREATE_JOB_SUCCESS:
      return {
        ...state,
        visible_create: false,
        fields: [],
      }
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
  const [reload, setReload] = useState(false)
  const { user } = props;

  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  const [jobsByCompany, isFetching] = useJobsByCompany(header, reload, setReload);

  useEffect(() => {
    if (!isFetching) setReload(reload);
  }, [isFetching])

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
  const createSuccess = () => {
    setReload(true);
    dispatch({ type: types.CREATE_JOB_SUCCESS });
    notification['success']({
      message: 'Success',
      description:
        "Success ! Your position has been created"
    });
  }

  const onFinisCreateJobs = async (fields) => {
    fields.tags = [];
    delete fields['photo'];

    if (state.newPhoto.length > 0) {
      fields.logo = state.newPhoto[0].response.data.file;
    }

    dispatch({ type: types.LOADING, payload: true });
    await axios.post('/api/company/jobs', fields, header)
      .then(() => {
        createSuccess();
      })
      .catch((err) => {
        console.log(err);
        setReload(true);
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this position, please try again. "
        });
      })
  };

  const handlerEditJob = async (fields) => {
    if (state.editPhoto.length > 0) {
      fields.logo = state.editPhoto[0].response.data.file;
    }
    try {
      await axios.patch('/api/company/jobs/' + fields._id, fields, header);
      setReload(!reload);
      notification['success']({
        message: 'Success',
        description:
          "Success ! Your position has been edited correctly"
      });
    } catch (err) {
      setReload(true);
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! We couldn't save changes, please try again"
      });
    }
  };


  const openDrawerCreate = () => {
    dispatch({ type: types.OPEN_DRAWER_CREATE });
  };

  const closeDrawerCreate = () => {
    dispatch({ type: types.OPEN_DRAWER_CREATE });
  };


  const openDrawer = (propsFields) => {
    let fields = [];
    for (let key in propsFields) {
      let inputs = {
        name: [key],
        value: propsFields[key]
      }
      fields.push(inputs);
    }
    dispatch({ type: types.EDITING });
    dispatch({ type: types.SHOW_DRAWER, payload: fields });
  };

  const onCloseDrawer = () => {
    dispatch({ type: types.SHOW_DRAWER, payload: [] });
  }

  const styleWrapper = {
    paddingTop: 20,
    paddingBottom: 20,
  }

  return (
    <>
      <Row>
        <SideNav currentLocation="1" />
        <Col span={18} className="profile-company__jobs">
          {/* // CRUM JOBS */}
          <WrapperSection row={24} styles={styleWrapper}>
            <Row justify='space-between' align='middle' className='add-new-driver--header'>
              <Col span={8}>
                <Title level={3}> Create and edit your position </Title>
                <Text> Fill the form and publish a job search, wich will we seen by our drivers</Text>
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  shape="round"
                  size="large"
                  block
                  onClick={openDrawerCreate}>
                  Create Job
                </Button>
              </Col>
            </Row>
            <Divider />
          </WrapperSection>
          {/* listado de jobs */}
          <WrapperSection row={24} styles={styleWrapper}>
            <JobsList
              header={header}
              setReload={setReload}
              isFetching={isFetching}
              openDrawer={openDrawer}
              jobsByCompany={jobsByCompany}
            />
          </WrapperSection>
        </Col>
      </Row>
      <Drawer
        title='Create Job'
        placement="right"
        closable={true}
        width={680}
        onClose={closeDrawerCreate}
        visible={state.visible_create}>
        {
          state.visible_create && <FormJobs
            beforeUpload={beforeUpload}
            propsUpload={propsUpload}
            formType='create'
            onFinisCreateJobs={onFinisCreateJobs}
          />
        }
      </Drawer>
      <Drawer
        title='Edit Job'
        placement="right"
        closable={true}
        width={680}
        onClose={onCloseDrawer}
        visible={state.visible}>
        <FormJobs
          beforeUpload={beforeUpload}
          fields={state.fields}
          propsUpload={propsUpload}
          formType='edit'
          ediJob={handlerEditJob}
        />
      </Drawer>
    </>
  )
}

export default withRouter(
  connect(mapStateToProps)(CompanyJobView)
);