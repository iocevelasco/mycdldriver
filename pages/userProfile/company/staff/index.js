import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from 'components/layout';
import { Row, Col, List, Avatar, Card, Form, Table, Typography, Modal, Button, Rate, Input } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
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
    const { modalProps } = state
    const data = {
      id: modalProps._id,
      ranking,
      commnet: comment
    };
    await axios.patch(`/api/company/jobs/change_rank`, data, header)
      .then((response) => {
        fetchStaffList();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: url => <Avatar size={80} src={url} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Lastname',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];


  return (
    <MainLayout {...configSection}>
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
                              Rate
                        </a>,
                          ]}>
                          <List.Item.Meta
                            avatar={
                              <Avatar src={item.logo} />
                            }
                            title={<p>{`${item.title}`} </p>}
                            description={item.description}
                          />
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
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps)(TeamCompanyView));