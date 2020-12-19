import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from 'components/layout';
import { Row, Col, List, Space, Avatar, notification, Image, Card, Form, Table, Typography, Modal, Button, Rate, Input, Icon } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { StarFilled } from '@ant-design/icons';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
const { Title, Text } = Typography;
const { TextArea } = Input;

const initialState = {
  loading: true,
  modalVisible: false,
  loadingModal: false,
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
  CLOSE_MODAL: 'close_modal'
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
    default:
      throw new Error('Unexpected action');
  }
}

const TeamCompanyView = ({ user }) => {
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

  const configSection = {
    title: 'Our Drivers',
    user: { user },
    loading: state.loading,
  }

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

  const showRate = (job, user) => {
    console.log('job', job);
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'photo',
      key: 'photo',
      width: '10%',
      render: url => <Avatar size={80} src={url} />
    },
    {
      dataIndex: 'name',
      key: 'name',
      width: '15%',
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
            <StarFilled style={{ fontSize: '24px', color: '#ffce00' }} />
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
      render: (driver) => {
        return <span> {driver.phoneNumber} </span>
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
          <WrapperSection row={22} styles={stylesWrapper}>
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
    </>
  )
};

export default withRouter(connect(mapStateToProps)(TeamCompanyView));