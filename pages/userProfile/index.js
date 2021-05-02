import React from 'react';
import { useEffect } from 'react';
import { activeLoading } from '@store/reducers/landing_reducer';
import { WrapperSection } from 'components/helpers';
import { Typography, Card } from 'antd';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import './styles.less';

const { Title, Text } = Typography;

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
  }
}

const UserProfile = ({ user, ...props }) => {

  useEffect(() => {
    props.activeLoading(false)
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
    <WrapperSection styles={stylesWrapper}>
      <div className="profile-driver__route">
        <div className="profile-driver__route__title">
          <Title level={4}>  Let's do this!  </Title>
          <Title level={3}>Are you a driver or a company?</Title>
        </div>
        <div className="profile-driver__options">
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
                <img src='/static/images/team.svg' />
                <Text > Company </Text>
              </Card>
            </a>
          </Link>
        </div>
      </div>
    </WrapperSection>
  )
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (UserProfile));