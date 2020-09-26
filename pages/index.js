import React, {useEffect, useReducer} from 'react';
import MainLayout from '../components/layout';
import { Row, Col, Typography, Input, DatePicker, Select } from 'antd';
import HeaderHome from './home/components/search';
import CarouselComp from '../components/carousel';
import axios from 'axios';

const { Title } = Typography;
const { Option } = Select;

const { Search } = Input;

const initialState = {
  sponsors: [],
  search_name:'',

}

const types = {
  HANDLE_INPUTS:'handle_inputs',
  DATA:'data'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.HANDLE_INPUTS:
      return { ...state, ...action.payload }
    case types.DATA:
      return { ...state, ...action.payload }
    default:
      throw new Error('Unexpected action');
  }
}
const Home = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = async () => {
    await axios.get(`https://run.mocky.io/v3/633aa569-140f-4f58-9802-6738a6d6da5c`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }


  return (
    <>
      <MainLayout title='Wellcome'>
        <HeaderHome/>
        <div>
          <Row justify='center' align='middle'>
            <Col span={20}>
              <CarouselComp/>
            </Col>
          </Row>
        </div>
      </MainLayout>
    </>
  )
}


export default Home;