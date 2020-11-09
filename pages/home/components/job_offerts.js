import { useRouter } from 'next/router'
import React from 'react';
import {
  Row,
  Col,
  List,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';
import Link from 'next/link';
import moment from 'moment';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Meta } = Card;

const JobListComp = ({ jobs, deviceType }) => {
  console.log('deviceType',deviceType)
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
                ? <DescriptionMobile item={item}/> 
                : <DescriptionDesktop item={item}/>
              }
            </Link>
        </List.Item>
      )}
     />
    </>
  );
}


const DescriptionMobile = ({item}) => {
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

const DescriptionDesktop = ({item}) => {
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