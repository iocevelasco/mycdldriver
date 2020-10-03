import React, { useEffect, useReducer } from 'react';
import MainLayout from '../components/layout';
import { Row, Col, Typography, Input, DatePicker, Select, Card } from 'antd';

const { Title } = Typography;
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
  //console.log(props)
  const {nickname, picture, emails } = user;
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
  }, [])


  return (
    <>
      <MainLayout title='Profile'>
        <p>{nickname}</p>
      </MainLayout>
    </>
  )
}




export default Profile;