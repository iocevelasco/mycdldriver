import React, { useEffect, useReducer } from 'react';
import MainLayout from '../components/layout';
import { Row, Col, Typography, Input, Avatar, Select, Card } from 'antd';

const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

const { Search } = Input;

const initialState = {
  sponsors: [],
  search_name: '',
  carousel_data: [],
  positions: [],

}

const types = {
  carousel_data: 'carousel_data',
  positions: 'positions',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data:action.payload }
    case types.positions:
      return { ...state, positions:action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const Profile = ({user}) => {
  const { picture, displayName } = user;
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
  }, [])


  return (
    <>
      <MainLayout title='Profile' user={user}>
        <Row justify='center' align='middle'>
          <Col span={16}>
            <div className="profile">
              <Card
                style={{ width: 400 }}>
                <Row justify='start' align='middle'>
                  <Col span={4}>
                  <Avatar src={picture}/>
                  </Col>
                  <Col span={8}>
                    <Text strong>{displayName}</Text>
                  </Col>
                </Row>
              </Card>
              </div>
          </Col>
        </Row>
      </MainLayout>
    </>
  )
}




export default Profile;