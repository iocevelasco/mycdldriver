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
  Image
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
  return (<Card
    bodyStyle={{
      padding: 0
    }}
    style={{ width: '100%', marginTop: 24, }}>
    <div className='home--job-offert'>
      <div className='thumbnails'>
        <Avatar size={80} src={item.company.photo} />
        <Avatar size={80} src={item.logo} />
      </div>
      <div className='job-offert__description'>
        <div>
          <Title level={3}> {item.title} </Title>
          <div>
            <Text> Address </Text>
            <Text strong> {item.city.cityName} </Text> <Text strong > | </Text>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className='action'>
        <Link
          href={{
            pathname: '/job-offert',
            query: { id: item._id },
          }}
        >
          <Button shape="round" type='secondary'> VIEW MORE </Button>
        </Link>
      </div>
    </div>
  </Card>)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListComp));
