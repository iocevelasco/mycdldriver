import React from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Meta } = Card;

const OffertJobComp = ({ title, image, description, address, date }) => {
  return (
    <>
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
            <Button type='primary'> Apply </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default OffertJobComp;