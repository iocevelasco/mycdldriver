import React, { useEffect, useReducer, useState } from 'react';
import { Row, Col, Progress, List, Space, Avatar, notification, Tabs, Image, Card, Form, Table, Typography, Modal, Button, Rate, Input, Icon, Drawer } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { StarFilled } from '@ant-design/icons';
import NewDriverForm from './components/FormNewDriver';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import ItemListPosition from './components/ItemListPosition';
import ReportIncident from './components/ReportIncident';
import DriverDetailProps from 'components/DriverDetail';
import RateDriver from './components/RateDriver';
import axios from 'axios';
import "./styles.less";
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const initialState = {
  loading: true,
  modalVisible: false,
  loadingModal: false,
  drawerVisible: false,
  formSelected: 'new-driver',
  drawerTitle: 'Add new driver',
  jobs: [],
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
}
const types = {
  STAFF_DATA: 'staff_data',
  ACTIVE_LOADING: 'active_loading',
  SHOW_MODAL: 'show_modal',
  SET_RANKING: 'set_ranking',
  CLOSE_MODAL: 'close_modal',
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
        drawerTitle: action.payload.drawerTitle
      }
    default:
      throw new Error('Unexpected action');
  }
}

const StaffCompanyView = ({ user }) => {
  const [form] = Form.useForm();
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

  const handleCancel = () => {
    dispatch({ type: types.CLOSE_MODAL })
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

  const openDrawer = (formTypeSelect) => {
    let drawerTitle = formTypeSelect === 'new-driver' ? 'Add new driver' : 'Report incident'
    dispatch({
      type: types.DRAWER_VISIBLE,
      payload: {
        formTypeSelect,
        drawerTitle
      }
    });
  };

  const onCloseDrawer = () => {
    dispatch({
      type: types.DRAWER_VISIBLE,
      payload: {
        formTypeSelect: '',
        drawerTitle: ''
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
      />
    return formSelected;
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'photo',
      key: 'photo',
      render: url => <Avatar size={60} src={url} />
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: ((n, item) => {
        const { name, lastname } = item
        return <span> {`${name} ${lastname}`} </span>
      })
    },
    {
      title: 'Rating',
      dataIndex: 'driver',
      key: 'rate',
      render: (driver) => {
        return (
          <Space >
            {(driver.rating == 0) ?
              <StarFilled style={{ fontSize: '24px', color: '#d3d3d3' }} /> :
              <StarFilled style={{ fontSize: '24px', color: '#ffce00' }} />}
            <span> {driver.rating} </span>
          </Space>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
    }
  ];

  return (
    <>
      <Row>
        <SideNav
          currentLocation='3' />
        <Col span={20}>
          <WrapperSection row={23} styles={stylesWrapper}>
            <Row justify='space-between' align='middle' className='add-new-driver--header'>
              <Col span={8}>
                <Title level={4}> Driver's status </Title>
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  shape="round"
                  size="large"
                  onClick={() => openDrawer('new-driver')}>
                  Create invitation
                </Button>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Drivers" key="1">
                <Table
                  rowKey='id'
                  dataSource={state.staffList}
                  loading={state.loading}
                  columns={columns}
                  expandable={{
                    expandedRowRender: driver => {
                      return <DriverDetailProps driverDetail={driver} />
                    }
                  }}
                />

              </TabPane>
              <TabPane tab="Incident" key="2">
                <p>pepe</p>
              </TabPane>
              <TabPane tab="Tab 1" key="3">
                <p>pepe</p>
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
      <Drawer
        title={state.drawerTitle}
        placement="right"
        closable={true}
        width={480}
        onClose={onCloseDrawer}
        visible={state.drawerVisible}>
        {selectForm(state.formSelected)}
      </Drawer>
    </>
  )
};

export default withRouter(connect(mapStateToProps)(StaffCompanyView));