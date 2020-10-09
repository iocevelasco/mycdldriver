import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../components/layout';
import { Row, Col, Typography, Input, Select } from 'antd';
import { withRouter } from 'next/router'
import CarouselComp from '../../components/carousel';
import axios from 'axios';

//mock
import mock_ranking from '../../mock/ranking.json';
import mock_jobs from '../../mock/job_offerts.json';


//View components
import HeaderHome from './components/search';
import OffertJobComp from './components/job_offerts';
import RankingComp from './components/ranking';

const { Title, Text } = Typography;
const { Option } = Select;

const { Search } = Input;

const initialState = {
  sponsors: [],
  search_name: '',
  carousel_data: [],
  positions: [],
  ranking: [],
}

const types = {
  carousel_data: 'carousel_data',
  positions: 'positions',
  ranking: 'ranking',
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload }
    case types.positions:
      return { ...state, positions: action.payload }
    case types.ranking:
      return { ...state, ranking: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

const  Home = ({ user }) => {
  console.log(user);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
    fetchPosition();
  }, [])

  const fetchData = async () => {
    await axios.get(`https://run.mocky.io/v3/0c407a99-66de-453f-8a8c-35d4d4a6e3fb`)
      .then((response) => {
        dispatch({ type: types.carousel_data, payload: response.data.parners });
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  const fetchPosition = async () => {
    dispatch({ type: types.positions, payload: mock_jobs.jobs_offers });
    dispatch({ type: types.ranking, payload: mock_ranking.ranking });

  }

  return (
    <>
      <MainLayout title='Welcome' user={user}>
        <HeaderHome />
        <WrapperSection row={20} arginTop={0}>
          <CarouselComp carousel_data={state.carousel_data} />
        </WrapperSection>
        <WrapperSection row={18} arginTop={32}>
          {
            state.positions.map((e, i) => {
              return (
                <OffertJobComp key={i} {...e} />
              )
            })
          }
        </WrapperSection>
        <WrapperSection row={18} marginTop={32} marginBottom={32}>
          <Row justify='center' align='middle' gutter={[16]} style={{marginTop:24}}>
            <Col span={14}>
              <Title style={{textAlign: 'center'}}>Our Drivers</Title>
              <Text style={{textAlign: 'center', display:'flex'}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is </Text>
            </Col>
          </Row>
          <Row justify='center' align='middle' gutter={[16]}>
            {
              state.ranking.map((e, i) => {
                return (
                  <RankingComp key={i} {...e} />
                )
              })
            }
          </Row>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

const WrapperSection = ({ children, row, marginTop, marginBottom }) => {
  return (
    <div style={{marginTop:marginTop, marginBottom:marginBottom}}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(Home);