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

const RankingComp = ({ rankingDriver }) => {
  const stars = [1,2,3,4,5]

  return (
    <>
    {
      rankingDriver.map((e,key)=>{
        return (
          <Col key={key} className="home--ranking" lg={6} md={12} sm={22}>
          <Card
           hoverable={true}
            cover={
              <img
                alt="example"
                src={e.image}
              />
            }
            style={{ width: '100%', marginTop: 24, }}>
            <div className='star-container'>
              {stars.map((e, key)=> <StarFilled key={key} style={{color:'#FFE206'}} />)}
            </div>
            <Meta
              title={e.full_name}
              description={`Address ${e.address}`}
            />
          </Card>
          </Col>
        )
      })
    }
    </>
  );
}

export default RankingComp;