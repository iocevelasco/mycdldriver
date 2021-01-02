import React, { useEffect, useState } from 'react';
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
  Divider,
  Image
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;

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
    <>
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

              </Row>
              { Array.isArray(detail.driver.experience) &&
              <span><Divider />
              <p className="site-description-item-profile-p">Experience</p>
              {detail.driver.experience.map((i) => {
              return <Row>
                <Col span={12}>
                  {i.have ? <DescriptionItem title={i.name} content={`${i.years} years`} /> : <DescriptionItem title={i.name} content='Does not have' />}
                </Col>
              </Row>
              })}
              </span>
              }
              <Divider />
              <Row>
                <Col span={12}>
                  <Title level={2}>DLN</Title>
                  <Image
                    width={250}
                    src={detail.driver.imageDln}
                    fallback="data:image/png;base64,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"
                  />
                </Col>
                <Col span={12}>
                <Title level={2}>Medic Card</Title>
                  <Image
                    width={250}
                    src={detail.driver.medicCardImage}
                    fallback="data:image/png;base64,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"
                  />
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
    </>
  )
};


export default withRouter(connect(mapStateToProps)(CandidateView));