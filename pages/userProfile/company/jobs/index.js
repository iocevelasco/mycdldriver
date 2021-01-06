import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Typography, message, Drawer, Button, notification, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import { WrapperSection } from 'components/helpers';
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
  const [jobsByCompany, setOptions] = useState([]);
  const [image, setImage] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { user } = props;
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const fetchJobList = async () => {
    setIsFetching(true);
    await axios
      .get('/api/company/jobs/private', header)
      .then((response) => {
        let options = response.data.data;
        setOptions(options);
        setIsFetching(false);
      })
      .catch((err) => {
        setOptions([]);
        console.log(err)
      })
  }

  useEffect(() => {
    fetchJobList()
  }, []);


  const handleOnChangeImage = ({ file }) => {
    setImage(file.response);
  };

  const createSuccess = () => {
    fetchJobList();
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
    fields.logo = image;

    dispatch({ type: types.LOADING, payload: true });
    await axios.post('/api/company/jobs', fields, header)
      .then(() => {
        createSuccess();
      })
      .catch((err) => {
        console.log(err);
        fetchJobList();
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this position, please try again. "
        });
      })
  };

  const handlerEditJob = async (fields) => {
    fields.logo = image;
    try {
      await axios.patch('/api/company/jobs/' + fields._id, fields, header);
      fetchJobList();
      notification['success']({
        message: 'Success',
        description:
          "Success ! Your position has been edited correctly"
      });
    } catch (err) {
      fetchJobList();
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
              fetchJobList={fetchJobList}
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
            handleOnChangeImage={handleOnChangeImage}
            formType='create'
            setImage={setImage}
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
        {
          state.visible &&
          <FormJobs
            setImage={setImage}
            handleOnChangeImage={handleOnChangeImage}
            fields={state.fields}
            formType='edit'
            ediJob={handlerEditJob}
          />
        }
      </Drawer>
    </>
  )
}

export default withRouter(
  connect(mapStateToProps)(CompanyJobView)
);