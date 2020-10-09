import { useRouter } from 'next/router'
import React from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';
import Link from 'next/link';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Meta } = Card;

const JobListComp = ({ title, image, description, address, date, postion_id }) => {
  return (
    <>
   <Link href={{
     pathname: '/jobs',
     query:{
       id: postion_id
     }}}>
      <Card
        bodyStyle={{
          padding: 0
        }}
        style={{ width: '100%', marginTop: 24, }}>
        <div className='home--job-offert'>
          <div className='thumbnails'>
            <Avatar size={120} src={image} />
          </div>
          <div className='job-offert__description'>
            <div>
              <Title level={3}> {title} </Title>
              <div>
                <Text> Addres </Text>
                <Text strong> {address} </Text> <Text strong > | </Text>
                <Text> Date </Text>
                <Text strong> {date} </Text>
              </div>
              <Text> {description} </Text>
              <div>
              </div>
            </div>
          </div>
          <div className='action'>
          <Link
            href={{
              pathname: '/jobOffert',
              query: { id: postion_id },
              }}
              >
               <Button type='primary'> Apply </Button>
            </Link>
          </div>
        </div>
      </Card>
      </Link>
    </>
  );
}

export default JobListComp;