import React, { useEffect, useReducer } from 'react';
import { Row, Col, List, Space, Avatar, notification, Tabs, Image, Card, Form, Table, Typography, Modal, Button, Rate, Input, Icon, Drawer } from 'antd';
import { WrapperSection } from 'components/helpers';
import NewDriverForm from './components/FormNewDriver';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import ReportIncident from './components/ReportIncident';
import RateDriver from './components/RateDriver';
import UnlinkDriver from './components/unlinkDriverJob';
import DriverList from './components/DriversList';
import JobList from './components/JobList';
import IncidentList from './components/IncidentList';
import useMobileDetect from 'use-mobile-detect-hook';
import axios from 'axios';
import { UserOutlined, CarOutlined, WarningOutlined } from '@ant-design/icons';
import "./styles.less";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const initialState = {
  loading: true,
  modalVisible: false,
  modalUnlinkVisible: false,
  loadingModal: false,
  drawerVisible: false,
  formSelected: 'new-driver',
  drawerTitle: 'Add new driver',
  jobs: [],
  jobSelected: {},
  userSelected: {},
  staffList: [],
  ranking: {
    id: '',
    ranking: '',
    commnet: '',
  },
  modalProps: {
    jobTitle: '',
    fullname: '',
    photo: ''
  },
  modalUnlinkProps: {
    jobTitle: '',
    fullname: ''
  },
}
const types = {
  STAFF_DATA: 'staff_data',
  ACTIVE_LOADING: 'active_loading',
  SHOW_MODAL: 'show_modal',
  SHOW_MODAL_UNLINK: 'show_modal_unlink',
  SET_RANKING: 'set_ranking',
  CLOSE_MODAL: 'close_modal',
  CLOSE_MODAL_UNLINK: 'close_modal_unlink',
  DRAWER_VISIBLE: 'drawer_visible'
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.ACTIVE_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.SHOW_MODAL:
      return {
        ...state,
        modalVisible: true,
        modalProps: action.payload,
      }
    case types.SHOW_MODAL_UNLINK:
      return {
        ...state,
        modalUnlinkVisible: true,
        modalUnlinkProps: action.payload,
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        modalVisible: false,
        modalProps: {
          jobTitle: '',
          fullname: '',
          photo: ''
        },
      }
    case types.CLOSE_MODAL_UNLINK:
      return {
        ...state,
        modalUnlinkVisible: false,
        modalUnlinkProps: {
          jobTitle: '',
          fullname: ''
        },
      }
    case types.STAFF_DATA:
      return {
        ...state,
        staffList: action.payload,
        loading: false
      }
    case types.SET_RANKING:
      return {
        ...state,
        staffList: action.payload,
        loading: false
      }
    case types.DRAWER_VISIBLE:
      return {
        ...state,
        drawerVisible: !state.drawerVisible,
        formSelected: action.payload.formSelected,
        drawerTitle: action.payload.drawerTitle,
        userSelected: action.payload.user,
        jobSelected: action.payload.job
      }
    default:
      throw new Error('Unexpected action');
  }
}

const StaffCompanyView = ({ user }) => {
  const [form] = Form.useForm();
  const detectMobile = useMobileDetect();
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    dispatch({ type: types.ACTIVE_LOADING });
    await axios.get(`/api/company/jobs/staff`, header)
      .then((response) => {
        dispatch({ type: types.STAFF_DATA, payload: response.data.data });
      })
      .catch((error) => console.log(error));
  };

  const addNewDriver = async (fields) => {
    const { newDriver } = await beforeToCreateProfile(fields);
    await axios.post('/api/driver/staff/new', newDriver, header)
      .then((response) => {
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
        });
        onCloseDrawer();
        fetchStaffList();
      })
      .catch((err) => {
        console.log('[ user registry error ]', err);
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this user, please try again. "
        });
      })
  }

  const beforeToCreateProfile = async (fields) => {
    try {
      const { name, dln, lastname, email, job } = fields;
      let newDriver = {}
      newDriver.name = name;
      newDriver.lastname = lastname;
      newDriver.email = email;
      newDriver.dln = dln;
      newDriver.job = job;
      return {
        newDriver,
      }
    } catch (error) {
      console.log(error);
    }
  }

  const stylesWrapper = {
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

  const showRate = (job, user) => {

    const { title, apply } = job;
    const { name, lastname, photo } = user;

    const modalProps = {
      title,
      _id: apply._id,
      fullname: `${name} ${lastname}`,
      photo,
    }
    dispatch({ type: types.SHOW_MODAL, payload: modalProps })
  };

  const showUnlink = (job, user) => {

    const { title, apply } = job;
    const { name, lastname } = user;

    const modalProps = {
      title,
      _id: apply._id,
      fullname: `${name} ${lastname}`,
    }
    dispatch({ type: types.SHOW_MODAL_UNLINK, payload: modalProps })
  };

  const handleCancel = () => {
    dispatch({ type: types.CLOSE_MODAL })
  };

  const handleUnlinkCancel = () => {
    dispatch({ type: types.CLOSE_MODAL_UNLINK })
  };

  const updateDriverRanking = async (fiels) => {
    const { ranking, comment } = fiels;
    const { modalProps } = state;
    const data = {
      id: modalProps._id,
      ranking,
      commnet: comment
    };
    await axios.patch(`/api/company/jobs/change_rank`, data, header)
      .then((response) => {
        fetchStaffList();
        dispatch({ type: types.CLOSE_MODAL })
        notification['success']({
          message: 'Success',
          description:
            "Congratulation! you have done this rate"
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const unlinkDriver = async (fields) => {
    const { description } = fields;
    const { modalUnlinkProps } = state;
    const data = {
      description: description
    };

    await axios.patch(`/api/company/jobs/history/${modalUnlinkProps._id}`, data, header)
      .then((response) => {
        fetchStaffList();
        dispatch({ type: types.CLOSE_MODAL_UNLINK })
        notification['success']({
          message: 'Success',
          description:
            "Congratulation! the driver has been successfully unlinked"
        });
      })
      .catch((err) => {
        console.log(err);
        notification['error']({
          message: 'Error',
          description:
            "An error occurred while unlinking the driver, please try again"
        });
      })
  }

  const openDrawer = (formSelected, user, job) => {
    let drawerTitle = formSelected === 'new-driver' ? 'Add new driver' : 'Report incident';
    dispatch({
      type: types.DRAWER_VISIBLE,
      payload: {
        formSelected,
        drawerTitle,
        user,
        job
      }
    });
  };

  const onCloseDrawer = () => {
    dispatch({
      type: types.DRAWER_VISIBLE,
      payload: {
        formSelected: '',
        drawerTitle: '',
        user: {},
        job: {}
      }
    });
  }

  const selectForm = (type) => {
    const formSelected = type == 'new-driver' ? <NewDriverForm
      addNewDriver={addNewDriver}
      loader={state.loading}
      header={header}
    /> : <ReportIncident
        addNewDriver={addNewDriver}
        loader={state.loading}
        header={header}
        user={state.userSelected}
        job={state.jobSelected}
        closeDrawer= {onCloseDrawer}
      />
    return formSelected;
  }

  return (
    <>
      <Row>
        <Col span={24} className="profile-company__jobs">
          <WrapperSection row={23} styles={stylesWrapper}>
            <Row justify='space-between' align='middle' className='add-new-driver--header'>
              <Col xs={24} xl={8}>
                <Title level={4}> Driver's status </Title>
              </Col>
              <Col xs={24} xl={4}><center>
                <Button
                  type='primary'
                  shape="round"
                  size="large"
                  onClick={() => openDrawer('new-driver', {})}>
                  Create invitation
                </Button></center>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1">
              <TabPane tab={
                <span>
                  <UserOutlined />
                  Drivers
                </span>
              } key="1">
                <DriverList
                  staffList={state.staffList}
                  loading={state.loading}
                  header={header}
                  fetchStaffList = {fetchStaffList}
                />
              </TabPane>
              <TabPane tab={
                <span>
                  <CarOutlined />
                  Jobs List
                </span>
              } key="2">
                <JobList
                  staffList={state.staffList}
                  loading={state.loading}
                  showRate={showRate}
                  showUnlink={showUnlink}
                  openDrawer={openDrawer} />
              </TabPane>
              <TabPane tab={
                <span>
                  <WarningOutlined />
                  Incident List
                </span>
              } key="3">
                <IncidentList
                  header={header}
                  fetchStaffList = {fetchStaffList}
                  staffList={state.staffList}
                  loading={state.loading} />
              </TabPane>
            </Tabs>
          </WrapperSection>
        </Col>
      </Row>
      <RateDriver
        visible={state.modalVisible}
        modalProps={state.modalProps}
        handleCancel={handleCancel}
        onFinish={updateDriverRanking}
      />
      <UnlinkDriver
        visible={state.modalUnlinkVisible}
        modalProps={state.modalUnlinkProps}
        handleCancel={handleUnlinkCancel}
        onFinish={unlinkDriver}
      />
      <Drawer
        title={state.drawerTitle}
        placement="right"
        closable={true}
        width={detectMobile.isMobile() ? 400 : 480}
        onClose={onCloseDrawer}
        visible={state.drawerVisible}>
        {selectForm(state.formSelected)}
      </Drawer>
    </>
  )
};

export default withRouter(connect(mapStateToProps)(StaffCompanyView));