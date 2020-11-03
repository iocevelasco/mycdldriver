import React from 'react';
import { useEffect } from 'react';
import MainLayout from '../../components/layout';
import { WrapperSection } from '../login/node_modules/components/helpers';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Typography,
  Card
} from 'antd';
import Link from 'next/link'

const { Title, Text } = Typography;

function mapStateToProps(state){
  return {
      users: state.users
  }
}

function mapDispatchToProps(){
  return {
    handleDrawer: data => {
      dispatch({ type: 'USER_DATA', payload: data });
    },
  }
};


const UserProfile = ({ user, loading, ...props }) => {
  useEffect(()=>{
    props.handleDrawer(user);
  },[]);
  
  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    marginTop: marginTop, 
    marginBottom: marginBottom,
    backgroundSize:'contain',
    }

  return (
    <MainLayout title='Profile' user={user} loading={loading}>
      <WrapperSection {...stylesWrapper}>
        <div className="profile-driver__route">
          <div className="title">
            <Title level={4}>  Let's do this!  </Title>
            <Title level={3}>Are you a driver or a company?</Title>
          </div>
          <div className="card-container">
            <Link href="/userProfile/driver/profile">
              <Card
                hoverable={true}>
                <img src='/static/images/driver.svg' />
                <Text > Drivers </Text>
              </Card>
            </Link>
            <Link href="/userProfile/company/profile">
              <Card
                hoverable={true}>
                <img src='/static/images/truck.svg' />
                <Text > Company </Text>
              </Card>
              </Link>
          </div>
        </div>
      </WrapperSection>
    </MainLayout>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
