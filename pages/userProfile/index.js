import React from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Card
} from 'antd';
import Link from 'next/link'

const { Title, Text } = Typography;

const UserProfile = ({ user, ...props }) => {
  return (
    <MainLayout title='Profile' user={user}>
      <WrapperSection row={24} mt={0}>
        <div className="profile-driver__route">
          <div className="title">
            <Title level={4}>  Let's do this!  </Title>
            <Title level={3}>Are you a driver or a company?</Title>
          </div>
          <div className="card-container">
            <Link href="/userProfile/driver">
              <Card
                hoverable={true}
                onClick={() => selectUserType(1)}>
                <img src='/static/images/driver.svg' />
                <Text > Drivers </Text>
              </Card>
            </Link>
            <Link href="/userProfile/company">
              <Card
                hoverable={true}
                onClick={() => selectUserType(2)}>
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


const WrapperSection = ({ children, row, marginTop, marginBottom }) => {
  return (
    <div style={{ 
      background: `url('/static/images/bg-routes.jpg')`,
      marginTop: marginTop, 
      marginBottom: marginBottom,
      backgroundSize:'contain',
      }}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}


export default UserProfile;