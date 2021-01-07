import React, { useEffect, useReducer, useState } from 'react';
import { Row, Col, Progress, List, Space, Avatar, notification, Image, Card, Form, Table, Typography, Modal, Button, Rate, Input, Icon, Drawer } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { StarFilled } from '@ant-design/icons';
import NewDriverForm from './FormNewDriver';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import "./styles.less";
const { Title, Text } = Typography;
const { TextArea } = Input;

const initialState = {
  loading: true,
  modalVisible: false,
  loadingModal: false,
  drawerVisible: false,
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
        drawerVisible: !state.drawerVisible
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
    const { title, _id, apply } = job;
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

  const changeRanking = async (fiels) => {
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

  const openDrawer = () => {
    dispatch({ type: types.DRAWER_VISIBLE });
  };

  const onCloseDrawer = () => {
    dispatch({ type: types.DRAWER_VISIBLE });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'photo',
      key: 'photo',
      width: '10%',
      render: url => <Avatar size={60} src={url} />
    },
    {
      dataIndex: 'name',
      key: 'name',
      width: '10%',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'driver',
      key: 'rate',
      width: '15%',
      render: (driver) => {
        return <span> {driver.areaCode}-{driver.phoneNumber} </span>
      },
    },
    {
      title: 'dln',
      dataIndex: 'driver',
      align: 'center',
      key: 'dln',
      render: (driver) => {
        return (
          <Space >
            <span> {driver.dln} </span>
          </Space>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
    },
    {
      title: 'Percentage complete',
      dataIndex: 'completeProfile',
      align: 'center',
      key: 'completeProfile',
      render: (n, item) => {
        return <Progress percent={item.completeProfile} />
      }
    },
  ];

  const styles = {
    listJObs: {
      display: 'flex',
      flexDirection: 'column',
    }
  }

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
                  onClick={openDrawer}>
                  Create invitation
                </Button>
              </Col>
            </Row>
            <Card>
              <Table
                rowKey='id'
                dataSource={state.staffList}
                loading={state.loading}
                columns={columns}
                expandable={{
                  expandedRowRender: record => {
                    return <List
                      header={<Title level={4}>Positions</Title>}
                      itemLayout="horizontal"
                      bordered
                      dataSource={record.jobs}
                      renderItem={item => (
                        <List.Item
                          key={item._d}
                          actions={[
                            <a onClick={() => showRate(item, record)}>
                              Rate this job
                        </a>,
                          ]}>
                          <div style={{ width: '100%' }}>
                            <Row gutter={[24]} justify='space-between' align='middle'>
                              <Col span={2}>
                                <Avatar shape="square" size={80} src={item.logo} />
                              </Col>
                              <Col span={1}>
                                <Space>
                                  <StarFilled style={{ fontSize: '24px', color: '#ffce00' }} />
                                  <span> {item.apply.ranking} </span>
                                </Space>
                              </Col>
                              <Col span={18}>
                                <div style={styles.listJObs}>
                                  <p>{item.title} </p>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </List.Item>
                      )}
                    />
                  }
                }}
              />
            </Card>
          </WrapperSection>
        </Col>
      </Row>
      <Modal
        visible={state.modalVisible}
        title={state.modalProps.title}
        onCancel={handleCancel}
        footer={null}
      >
        <Row>
          <Form
            form={form}
            onFinish={changeRanking}
            name="form_ranking"
            layout='vertical'>
            <Row gutter={[24]} justify='center'>
              <Col span={24}>
                <Title level={3}> How was your experience with {state.modalProps.fullname}?</Title>
              </Col>
              <Col span={8}>
                <Form.Item
                  name='ranking'
                  rules={[
                    {
                      required: true,
                      message: 'Ranking is required!',
                    },
                  ]}>
                  <Rate
                    allowHalf
                    allowClear={false} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name='comment'
                  rules={[
                    {
                      required: false,
                    },
                  ]}>
                  <TextArea
                    rows={4}
                    placeholder="Describe your experience working with this driver"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24]} justify='center' align='middle'>
              <Col span={12}>
                <Button
                  htmlType="submit"
                  type='primary'
                  style={{ marginTop: 40 }}
                  shape="round"
                  block
                  size='large'>Send</Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>
      <Drawer
        title='Add new driver'
        placement="right"
        closable={true}
        width={480}
        onClose={onCloseDrawer}
        visible={state.drawerVisible}>
        <NewDriverForm
          addNewDriver={addNewDriver}
          loader={state.loading}
          header={header}
        />
      </Drawer>
    </>
  )
};

export default withRouter(connect(mapStateToProps)(StaffCompanyView));