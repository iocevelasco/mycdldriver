import React, { useEffect, useReducer } from 'react';
import { Row, Col, Typography, Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import CarouselComp from 'components/carousel';
import { WrapperSection } from 'components/helpers';
import { connect } from 'react-redux';
import queryString from "query-string";
import { fetchJobPositionData, fetchDriversData, fetchCommonData, fetchServices } from '@store/reducers/landing_reducer';
import { logoutUser } from '@store/reducers/user_reducer';
import axios from 'axios';

//mock
import mock_ranking from '../mock/ranking.json';
import "./home/styles.less";
//View components
import HeaderLandingComp from './home/components/header_home';
import JobsListComp from './home/components/job_offerts';
import RankingComp from './home/components/ranking';
import ServicesList from './home/components/ServicesList';

const { Title, Text } = Typography;

const initialState = {
  sponsors: [],
  search_name: '',
  carousel_data: [],
  query: '',
  ranking: [],
  filter_selected: {}
}

const types = {
  carousel_data: 'carousel_data',
  positions: 'positions',
  FILTER_SELECTED: 'ranking',
  CLEAN_FILTERS: 'clean_filters'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload }
    case types.ranking:
      return { ...state, ranking: action.payload }
    case types.FILTER_SELECTED:
      return {
        ...state,
        filter_selected: action.payload.filters,
        query: action.payload.query
      }
    case types.CLEAN_FILTERS:
      return {
        ...state, query: ''
      }
    default:
      throw new Error('Unexpected action');
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query)),
    fetchDrivers: () => dispatch(fetchDriversData()),
    fetchServices: () => dispatch(fetchServices()),
    fetCommons: () => dispatch(fetchCommonData()),
    handleLogout: () => dispatch(logoutUser()),
  }
}

const Home = ({
  user,
  fetchJobs,
  fetchDrivers,
  deviceType,
  fetCommons,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchJobs(state.query);
    fetchPosition();
    fetchDrivers();
    fetCommons();
  }, [])

  const cleanFilter = () => {
    fetchJobs('');
    dispatch({ type: types.CLEAN_FILTERS });
  }

  const handlerSearch = (e, key) => {
    let value = "";
    if (key == 'input') value = e;
    else if (key == 'city') value = e;

    let filters = state.filter_selected;

    filters[key] = value;
    const stringify = queryString.stringify(filters);
    dispatch({
      type: types.FILTER_SELECTED,
      payload: {
        query: stringify,
        filters: filters
      }
    });
  }

  const DeleteUser = async () => {
    const header = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    await axios.delete('/api/user/' + user._id, header)
      .then((response) => props.handleLogout())
      .catch((err) => {
        console.log('err', err)
      })
  }

  const fetchPosition = async () => {
    dispatch({ type: types.ranking, payload: mock_ranking.ranking });
  }

  const wrapperStyle = {
    marginTop: 16,
    marginBottom: 16
  }

  return (
    <>
      <HeaderLandingComp
        handlerSearch={handlerSearch}
        filter_selected={state.filter_selected}
        cleanFilter={cleanFilter}
        query={state.query}
      />
      <WrapperSection xs={24} row={20} style={wrapperStyle}  >
        <CarouselComp carousel_data={state.carousel_data} />
      </WrapperSection>
      <WrapperSection xs={24} row={18}>
        <Row justify='center' align='middle' gutter={[16]} style={{ marginTop: 24 }}>
          <Col span={14}>
            <Title style={{ textAlign: 'center' }}>Find your new job</Title>
          </Col>
        </Row>
        <JobsListComp type='large' />
      </WrapperSection>
      <WrapperSection xs={24} row={18} style={wrapperStyle} >
        <Row justify='center' align='middle' gutter={[16]} style={{ marginTop: 24 }}>
          <Col span={14}>
            <Title style={{ textAlign: 'center' }}>Our Drivers</Title>
            <Text style={{ textAlign: 'center', display: 'flex' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is </Text>
          </Col>
        </Row>
        <Row justify='center' align='middle' gutter={[16, 16]}>
          <RankingComp rankingDriver={state.ranking} />
        </Row>
      </WrapperSection>
      <WrapperSection xs={24} row={24}>
        <Row justify='center' align='middle' gutter={[16]} style={{ marginTop: 24 }}>
          <Col span={14}>
            <Title style={{ textAlign: 'center' }}> Services </Title>
            <Text style={{ textAlign: 'center', display: 'flex', marginBottom: 32 }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is </Text>
          </Col>
        </Row>
        <ServicesList />
      </WrapperSection>
      {/* <div className='delete-user' style={{ display: 'block' }}>
        <Tooltip title=" Borrar usuario">
          <Button onClick={DeleteUser} shape="circle" icon={<DeleteOutlined />} />
        </Tooltip>
      </div> */}
    </>
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home)); 