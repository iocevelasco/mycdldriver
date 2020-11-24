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
  Divider
} from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
const { Title, Text } = Typography;

const initialState = {
  loading: true,
  jobs: [],
}
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
  const [driverDetail, setDetail] = useState({});
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
    let mock = [
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
      { name: 'name', photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', _id: 1234 },
    ]
    try {
      const { data } = await axios.post(`/api/company/jobs/myjobs`, {}, header);
      setCandidates(mock);
    } catch (err) {
      console.log(err)
    }
  }

  const handleDrawer = async () => {
    if (!visible) {
      setVisible(true);
      const { data } = await axios.get(`/api/company/jobs/myjobs`, {}, header);
    } else {
      setVisible(false);
      setDetail({})
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

  return (
    <MainLayout {...configSection}>
      <Row>
        <SideNav
          currentLocation='2' />
        <Col span={20}>
          <WrapperSection row={18} styles={stylesWrapper}>
            <Card>
              <List
                header={<Title level={4}>Applyed Jobs</Title>}
                itemLayout="horizontal"
                bordered
                dataSource={candidates}
                renderItem={item => (
                  <List.Item
                    key={item._d}
                    actions={[
                      <a onClick={() => handleDrawer(item._id)}>
                        View Profile
                      </a>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                      }
                      title={<a href="https://ant.design/index-cn">{item.name}</a>}
                      description="Progresser XTech"
                    />
                  </List.Item>
                )}
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
                  <Avatar size={80} />
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
                  <DescriptionItem title="Full Name" content="Lily" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Account" content="AntDesign@example.com" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="City" content="HangZhou" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Country" content="China🇨🇳" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Birthday" content="February 2,1900" />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <DescriptionItem title="Description" content="lorem ipsum" />
                </Col>
              </Row>
              <Divider />
              <p className="site-description-item-profile-p">Contacts</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Email" content="AntDesign@example.com" />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                </Col>
              </Row>
              <Row justify='center' gutter={[16]} align='middle'>
                <Col span={8}>
                  <Button shape="round" block={true} type='secondary'> Reject </Button>
                </Col>
                <Col span={8}>
                  <Button shape="round" block={true} type='primary'> Accept </Button>
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