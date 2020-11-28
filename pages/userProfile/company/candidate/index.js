import React, { useEffect, useState } from 'react';
import MainLayout from 'components/layout';
import {
  Row,
  Col,
  List,
  Avatar,
  Card,
  Typography,
  Drawer,
  Button,
  Table,
  Divider
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;

const types = {
  FETCH_DATA: 'FETCH_DATA',
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const CandidateView = ({ user, ...props }) => {
  const [candidates, setCandidates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoadin] = useState(true);
  const [detail, setDetail] = useState({
    email: '',
    lastname: '',
    name: '',
    photo: '',
    driver: {
      address: '',
      birthDate: '',
      description: '',
      dln: '',
      expDateDln: '',
      experience: null,
      phoneNumber: null,
      sex: 0,
      zipCode: ''
    }
  });
  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const configSection = {
    title: 'Our Drivers',
    user: { user },
  }

  useEffect(() => {
    fetchCandidates();
  }, [user]);

  const fetchCandidates = async () => {
    await axios.post(`/api/company/jobs/applys`, {}, header)
      .then((response) => {
        setCandidates(response.data.data);
        setLoadin(false);
      })
      .catch((err) => {
        setLoadin(false);
        console.log(err)
      })
  }

  const changeStatus = async (id, status) => {
    const data = {
      id: id,
      status: status
    };
    setLoadin(true);
    setVisible(false);
    await axios.patch(`/api/company/jobs/change_status`, data, header)
      .then((response) => {
        fetchCandidates();
      })
      .catch((err) => {
        setLoadin(false);
        console.log(err)
      })
  }

  const handleDrawer = async (driver) => {
    if (!visible) {
      setVisible(true);
      setDetail(driver);
    } else {
      setVisible(false);
      setDetail({
        email: '',
        lastname: '',
        name: '',
        photo: '',
        driver: {
          address: '',
          birthDate: '',
          description: '',
          dln: '',
          expDateDln: '',
          experience: null,
          phoneNumber: null,
          sex: 0,
          zipCode: ''
        }
      })
    }
  }

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  const stylesWrapper = {
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '40%'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Total Candidate',
      dataIndex: 'totaluser',
      align: 'center',
      key: 'totaluser',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      align: 'center',
      key: 'time',
      render: function (prepend) {
        return resoltTime(prepend)
      }
    },
  ];

  const resoltSexType = (props) => {
    let sexType
    if (props == 0) {
      sexType = 'Man'
    } else if (props == 1) {
      sexType = 'Woman'
    } else {
      sexType = 'Other'
    }
    return sexType;
  }

  const resoltTime = (props) => {
    let time
    if (props == 0) {
      time = 'Part-time'
    } else if (props == 1) {
      time = 'Full-time'
    } else {
      time = 'Eventual'
    }
    return time;
  }

  return (
    <MainLayout {...configSection}>
      <Row>
        <SideNav
          currentLocation='2' />
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
                      header={<Title level={4}>Applied jobs</Title>}
                      itemLayout="horizontal"
                      bordered
                      dataSource={record.appys}
                      renderItem={item => (
                        <List.Item
                          key={item._d}
                          actions={[
                            <a onClick={() => handleDrawer(item)}>
                              View Profile
                          </a>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar src={item.photo} />
                            }
                            title={<p>{`${item.name} ${item.lastname}`} </p>}
                            description={item.email}
                          />
                        </List.Item>
                      )}
                    />
                  }
                }}
                dataSource={candidates}
              />

            </Card>
            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={handleDrawer}
              visible={visible}
            >
              <Row align='middle'>
                <Col span={4}>
                  <Avatar size={80} src={detail.photo} />
                </Col>
                <Col span={12}>
                  <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile
              </p>
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">Personal</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Full Name" content={`${detail.name} ${detail.lastname}`} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Birthday" content={`${moment(detail.driver.birthDate).format('YYYY-MM-DD')}`} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Address" content={detail.driver.address} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Exp Dln" content={moment(detail.driver.expDateDln).format('YYYY-MM-DD')} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Sex" content={resoltSexType(detail.driver.sex)} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Experience" content={detail.driver.experience || 0} />
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">Contacts</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Email" content={`${detail.email}`} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Phone Number" content={`${detail.driver.phoneNumber}`} />
                </Col>
              </Row>
              <Row justify='center' gutter={[16]} align='middle'>
                <Col span={8}>
                  <Button 
                    shape="round" 
                    block={true} 
                    type='secondary'
                    onClick={() => changeStatus(detail.id, 2)}> Reject </Button>
                </Col>
                <Col span={8}>
                  <Button 
                    shape="round" 
                    block={true} 
                    type='primary'
                    onClick={() => changeStatus(detail.id, 1)} > Accept </Button>
                </Col>
              </Row>
            </Drawer>
          </WrapperSection>
        </Col>
      </Row>
    </MainLayout>
  )
};


export default withRouter(connect(mapStateToProps)(CandidateView));