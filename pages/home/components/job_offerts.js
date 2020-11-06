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

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Meta } = Card;

const JobListComp = ({ jobs }) => {
  return (
    <>
    <List
      bordered={false}
      dataSource={jobs}
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
      }}
      renderItem={item => (
        <List.Item>
          <Link href={{
            pathname: '/jobs',
            query:{
              id: item._id
            }}}>
              <Card
                bodyStyle={{
                  padding: 0
                }}
                style={{ width: '100%', marginTop: 24, }}>
                <div className='home--job-offert'>
                  <div className='thumbnails'>
                    <Avatar size={120} src={item.image} />
                  </div>
                  <div className='job-offert__description'>
                    <div>
                      <Title level={3}> {item.title} </Title>
                      <div>
                        <Text> Addres </Text>
                        <Text strong> {item.address} </Text> <Text strong > | </Text>
                        <Text> Date </Text>
                        <Text strong> {item.date} </Text>
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
              </Link>
        </List.Item>
      )}
     />
    </>
  );
}

export default JobListComp;