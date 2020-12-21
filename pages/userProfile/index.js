import React from 'react';
import { useEffect } from 'react';
import MainLayout from '../../components/layout';
import { WrapperSection } from 'components/helpers';

import {
  Row,
  Col,
  Typography,
  Card
} from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

const { Title, Text } = Typography;

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


const UserProfile = ({ user, ...props }) => {

  useEffect(() => {
    switch (user.typeUser) {
      case 1:
        props.router.push('/userProfile/driver/profile');
        break;
      case 2:
        props.router.push('/userProfile/company/profile');
        break;
      default:
        break;
    }
  }, [user.typeUser]);

  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundSize: 'contain',
  }

  return (
    <>
      <WrapperSection styles={stylesWrapper}>
        <div className="profile-driver__route">
          <div className="title">
            <Title level={4}>  Let's do this!  </Title>
            <Title level={3}>Are you a driver or a company?</Title>
          </div>
          <div className="card-container">
            <Link href="/userProfile/driver/profile">
              <a>
                <Card
                  hoverable={true}>
                  <img src='/static/images/driver.svg' />
                  <Text > Drivers </Text>
                </Card>
              </a>
            </Link>
            <Link href="/userProfile/company/profile">
              <a>
                <Card
                  hoverable={true}>
                  <img src='/static/images/truck.svg' />
                  <Text > Company </Text>
                </Card>
              </a>
            </Link>
          </div>
        </div>
      </WrapperSection>
    </>
  )
};

export default withRouter(connect(mapStateToProps)(UserProfile));