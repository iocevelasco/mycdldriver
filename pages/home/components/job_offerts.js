import React from 'react';
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

const JobListComp = ({ jobs, deviceType }) => {
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
            pathname: '/jobOffert',
            query: { id: item._id },
            }}
            >
            <Button type='primary'> Apply </Button>
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
        pathname: '/jobOffert',
        query: { id: item._id },
        }}
        >
        <Button type='primary'> Apply </Button>
      </Link>
    </div>
  </div>
</Card>)
}

export default JobListComp;