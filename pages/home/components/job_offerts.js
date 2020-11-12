import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchJobPositionData } from '@store/reducers/landing_reducer';
import { withRouter } from 'next/router';
import {
  List,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';
import Link from 'next/link';
import moment from 'moment';


const { Text, Title } = Typography

function mapStateToProps(state){
  return {
      jobs: state.landing.jobs, 
  }
}


function mapDispatchToProps(dispatch){
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query))
  }
}


const JobListComp = ({ jobs, deviceType, fetchJobs }) => {

  useEffect(() => {
    fetchJobs({});
  }, [])

  return (
    <>
    <List
      bordered={false}
      dataSource={jobs}
      pagination={{
        pageSize: 10,
      }}
      renderItem={item => (
        <List.Item>
          <Link href={{
            pathname: '/jobs',
            query:{
              id: item._id
            }}}>
              {
                deviceType === 'desktop' 
                ? <DescriptionDesktop item={item}/> 
                : <DescriptionMobile item={item}/>
              }
            </Link>
        </List.Item>
      )}
     />
    </>
  );
}


const DescriptionDesktop = ({item}) => {
  return (
      <Card
      bodyStyle={{
        padding: 0
      }}
      style={{ width: '100%', marginTop: 24, }}>
      <div className='home--job-offert'>
        <div className='thumbnails'>
          <Avatar size={120} src={item.logo} />
        </div>
        <div className='job-offert__description'>
          <div>
            <Title level={3}> {item.title} </Title>
            <div>
              <Text> Addres </Text>
              <Text strong> {item.city} </Text> <Text strong > | </Text>
              <Text> Date </Text>
              <Text strong> {moment(item.date).format('YYYY-MM-DD')} </Text>
            </div>
            <Text> {item.description} </Text>
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
            <Button type='primary'> VIEW MORE </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

const DescriptionMobile = ({item}) => {
 return (<Card
  bodyStyle={{
    padding: 0
  }}
  style={{ width: '100%', marginTop: 24, }}>
  <div className='home--job-offert'>
    <div className='thumbnails'>
      <Avatar size={120} src={item.logo} />
    </div>
    <div className='job-offert__description'>
      <div>
        <Title level={3}> {item.title} </Title>
        <div>
          <Text> Addres </Text>
          <Text strong> {item.city} </Text> <Text strong > | </Text>
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
        <Button type='primary'> VIEW MORE </Button>
      </Link>
    </div>
  </div>
</Card>)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListComp));
