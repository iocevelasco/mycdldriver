import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJobPositionData } from '@store/reducers/landing_reducer';
import { withRouter } from 'next/router';
import {
  List,
  Card,
  Avatar,
  Typography,
  Button,
  Image,
  Row, 
  Col
} from 'antd';
import Link from 'next/link';
import moment from 'moment';


const { Text, Title } = Typography

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    deviceType: state.landing.deviceType
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query))
  }
}

const JobListComp = ({ jobs, deviceType, fetchJobs, type }) => {
  useEffect(() => {
    fetchJobs('');
  }, [])

  const handlerTypeComponent = (type, item) => {
    let components;
    switch (type) {
      case 'small':
        components = <DescriptionSmall item={item} />
        break;
      case 'large':
        if (deviceType === 'desktop') components = <DescriptionDesktop item={item} />
        else components = <DescriptionMobile item={item} />
        break;
    }
    return components
  }

  return (
    <>
      <List
        bordered={false}
        style={{ width: '100%' }}
        dataSource={jobs}
        pagination={{
          pageSize: 10,
        }}
        renderItem={item => (
          <List.Item>
            {handlerTypeComponent(type, item)}
          </List.Item>
        )}
      />
    </>
  );
}


const DescriptionSmall = ({ item }) => {
  return (
    <div className='job-offert-list-small'>
      <Link href={{
        pathname: '/job-offert',
        query: {
          id: item._id
        }
      }}>
        <Card
          hoverable
          bodyStyle={{
            padding: 0,
            height: 100
          }}
          style={{ width: '100%', marginTop: 24, }}>
          <div className='container'>
            <div className='image'>
              <Avatar size={80} src={item.company.photo} />
            </div>
            <div className='job-offert__description'>
              <div>
                <Title level={5}> {item.title} </Title>
                <div>
                  <Text> Location </Text>
                  <Text strong> {item.city.cityName} </Text> <Text strong > | </Text>
                  <Text> Date </Text>
                  <Text strong> {moment(item.date).format('YYYY-MM-DD')} </Text>
                </div>
              </div>
            </div>
            <div className="thumbanails" style={{ backgroundImage: "url(" + item.logo + ")" }}>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}


const DescriptionDesktop = ({ item, small }) => {
  return (
    <Card
      hoverable
      bodyStyle={{
        padding: 0
      }}
      style={{ width: '100%', marginTop: 24, }}>
      <Link
        href={{
          pathname: '/job-offert',
          query: { id: item._id },
        }}
      >
        <div className='home--job-offert'>
          <div className="logo">
            <Avatar size={140} src={item.company.photo} />
          </div>
          <div className='job-offert__description'>
            <div>
              <Title level={3}> {item.title} </Title>
              <div>
                <Text> Address </Text>
                <Text strong> {item.city.cityName} </Text> <Text strong > | </Text>
                <Text> Date </Text>
                <Text strong> {moment(item.date).format('YYYY-MM-DD')} </Text>
              </div>
              <div>
                <Text> Phone </Text>
                <Text strong> {item.areaCode} - {item.phoneNumber} </Text> <Text strong > | </Text>
                <Text> Email </Text>
                <Text strong> {item.email} </Text>
              </div>
              <Text> {item.description} </Text>
            </div>
          </div>
          <div className="thumbnails" style={{ backgroundImage: "url(" + item.logo + ")" }}>
            <span></span>
          </div>
        </div>
      </Link>
    </Card>
  )
}

const DescriptionMobile = ({ item }) => {
  let espacio = {marginTop: 20};
  return (<Card
    bodyStyle={{
      padding: 10
    }}
    style={{ width: '100%', marginTop: 24, }}>
      <Row>
        <Col span={24}>
          <Title level={3}> {item.title} </Title>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{position: 'relative'}}>
        <div className='thumbnails' style={{
          height: 200,
          backgroundImage: "url(" + item.logo + ")",
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          textAlign: 'center',
          paddingTop: 60 }}>
          <Avatar size={80} src={item.company.photo} /> 
        </div>
        </Col>
      </Row>
      <Row style={espacio}>
        <Col span={24}>
          <Text> Address </Text>
          <Text strong> {item.city.cityName} </Text> <Text strong > | </Text>
          <Text> Date </Text>
          <Text strong> {moment(item.date).format('YYYY-MM-DD')} </Text>
        </Col>
        <Col span={24}>
          <Text> Phone </Text>
          <Text strong> {item.areaCode} - {item.phoneNumber} </Text> <Text strong > | </Text>
          <Text> Email </Text>
          <Text strong> {item.email} </Text>
        </Col>
      </Row>
      <Row style={espacio}>
        <Col span={24}>
          <Text> {item.description} </Text>
        </Col>
      </Row>
      <Row style={espacio}>
        <Col span={24} style={{textAlign: 'center'}}>
          <Link
            href={{
              pathname: '/job-offert',
              query: { id: item._id },
            }}
          >
            <Button shape="round" type='secondary'> VIEW MORE </Button>
          </Link>
        </Col>
      </Row>
  </Card>)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListComp));
