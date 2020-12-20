import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from 'components/layout';
import { Row, Col, List, Avatar, Card, Table, Typography, Modal, Button, Rate, Input, Space } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
const { Title, Text } = Typography;
const { TextArea } = Input;

const initialState = {
  loading: true,
  jobs: [],
}
const types = {
  TEAM_DATA: 'team_data',
  FETCH_DATA: 'FETCH_DATA',
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.TEAM_DATA:
      return { ...state, loading: false }
    case types.FETCH_DATA:
      return { ...state, jobs: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const TeamCompanyView = ({ user, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoadin] = useState(true);
  const [loadingModal, setLoadinModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rateJob, setRateJob] = useState({
    _id: "",
    tags: [],
    title: "",
    description: "",
    areaCode: 0,
    phoneNumber: 0,
    logo: "",
    email: "",
    city: "",
    time: 0,
    apply: {
      _id: "",
      ranking: 0,
      comment: ""
    }
  });
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const configSection = {
    title: 'Our Drivers',
    user: { user },
    loading: state.loading,
  }

  const showRate = (job) => {
    setRateJob(job);
    setVisible(true);
  };

  const handleOk = () => {
    setLoadinModal(true);
    changeRanking();
    setTimeout(() => {
      setLoadinModal(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    dispatch({ type: types.TEAM_DATA });
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    try {
      setLoadin(true);
      const { data } = await axios.get(`/api/company/jobs/staff`, header);
      dispatch({ type: types.FETCH_DATA, payload: data.data });
      setLoadin(false);
    } catch (err) {
      console.log(err)
    }
  }

  const changeRanking = async () => {
    const data = {
      id: rateJob.apply._id,
      ranking: rateJob.apply.ranking,
      commnet: rateJob.apply.comment
    };
    await axios.patch(`/api/company/jobs/change_rank`, data, header)
      .then((response) => {
        setLoadinModal(false);
        setVisible(false);
        fetchJobs();
      })
      .catch((err) => {
        setLoadin(false);
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

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

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
                loading={loading}
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
        visible={visible}
        title={rateJob.title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loadingModal} onClick={handleOk}>
            Send
          </Button>,
        ]}
      >
        <Row>
          <Col span={24}>
            <Title level={3}> How was your experience with ioce?</Title>
          </Col>
          <Col span={24}>
            <Rate
              allowHalf
              allowClear={false}
              value={rateJob.apply.ranking}
              onChange={(val) => {
                rateJob.apply.ranking = val;
                setRateJob(rateJob);
              }} />
          </Col>
          <Col span={24}>
            <TextArea
              rows={4}
              value={rateJob.apply.comment}
              placeholder="Describe your experience working with this driver"
              onChange={(val) => {
                rateJob.apply.comment = val.target.value;
                setRateJob(rateJob);
              }}
            />
          </Col>
        </Row>
      </Modal>
    </MainLayout>
  )
};

export default withRouter(connect(mapStateToProps)(TeamCompanyView));