import React from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';

import { StarFilled, StarOutlined } from '@ant-design/icons';

const { Text, Title } = Typography
const { Meta } = Card;

const RankingComp = ({ full_name, ranking, address, image }) => {
  const stars = [1,2,3,4,5]
  return (
    <>
    <Col className="home--ranking" lg={6} md={12} sm={22}>
      <Card
       hoverable={true}
        cover={
          <img
            alt="example"
            src={image}
          />
        }
        style={{ width: '100%', marginTop: 24, }}>
        <div className='star-container'>
          {stars.map(e=> <StarFilled style={{color:'#FFE206'}} />)}
        </div>
        <Meta
          title={full_name}
          description={`Address ${address}`}
        />
      </Card>
      </Col>
    </>
  );
}

export default RankingComp;