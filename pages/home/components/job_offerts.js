import React from 'react';
import { Skeleton, Switch, Card, Avatar, Typography } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Text } = Typography
const { Meta } = Card;

const OffertJobComp = ({title}) =>{
    return (
      <>
        <Card style={{ width: '100%', marginTop:24}}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={title}
            description="This is the description"
          />
        </Card>
      </>
    );
}

export default OffertJobComp