import React, { useEffect, useReducer } from 'react';
import MainLayout from '../components/layout';
import { Row, Col, Typography, Input, DatePicker, Select, Card } from 'antd';
import HeaderHome from './home/components/search';
import OffertJobComp from './home/components/job_offerts';
import CarouselComp from '../components/carousel';

import axios from 'axios';

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

const Home = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    fetchData();
    fetchPosition();
  }, [])

  const fetchData = async () => {
    await axios.get(`https://run.mocky.io/v3/0c407a99-66de-453f-8a8c-35d4d4a6e3fb`)
      .then((response) => {
        dispatch({type:types.carousel_data, payload:response.data.parners});
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const fetchPosition = async () => {
    await axios.get(`https://run.mocky.io/v3/f2b8f803-74d4-4e21-a93d-a5736e3d63ca`)
      .then((response) => {
        dispatch({type:types.positions, payload:response.data.position});
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <>
      <MainLayout title='Wellcome'>
        <HeaderHome />
        <WrapperSection row={20}>
          <CarouselComp carousel_data={state.carousel_data}/>
        </WrapperSection>
        <WrapperSection row={18}>
            {
              state.positions.map((e,i)=>{
                return (
                  <OffertJobComp key={i} {...e}/>
                )
              })
            }
        </WrapperSection>
        <WrapperSection>
          <p>lorem</p>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

const WrapperSection = ({ children, row}) => {
  return (
    <div>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}



export default Home;