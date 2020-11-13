import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Form,
  Button,
  Switch,
  InputNumber,
  Drawer
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import FormUserDriver from 'components/FormUserDriver';
import { MessageSucces } from 'components/helpers';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import { onChangeDriver } from '@store/reducers/user_driver';
import { connect } from 'react-redux';
import JobListComp from '../home/components/job_offerts';
import moment from 'moment';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  visible:true,
  showSucces:false,
  base: {
    name: '',
    lastname: '',
    typeUser: '1',
    photo: '',
    email: '',
    google_id: '',
    facebook_id: ''
  },
  driver: {
    dln: '',
    expDateDln: moment(new Date).format('DD MM'),
    birthDate: moment(new Date).format('DD MM'),
    areaCode: '',
    phoneNumber: '',
    experience: '',
    sex: '',
    address: '',
    zipCode: '',
    description: ''
  },
  title: '',
  logo: '',
  postion_id: 0,
  description: '',
  address:'',
  date: '',
  expire_date: '',
  company_name: '',
  experience:[
    {key:1-2, value:'1 - 2'},
    {key:2-4, value:'2 - 4'},
    {key:4-6, value:'4 - 6'},
    {key:6-9, value:'6 - 9'},
    {key:10-15, value:'10 - 15'}
  ]
}

const types = {
  FETCH_DETAIL: 'FETCH_DETAIL',
  SHOW_DRAWER:'SHOW_DRAWER',
  PROPS_BASE: 'PROPS_BASE',
  PROPS_DRIVER: 'PROPS_DRIVER'
}

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload }
    case types.FETCH_DETAIL:
      return { ...state, ...action.payload }
    case types.SHOW_DRAWER:
     return { ...state, visible:action.payload }
     case types.PROPS_BASE:
      return { ...state, base: action.payload }
      case types.PROPS_DRIVER:
        return { ...state, driver: action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

function mapStateToProps(state) {
  return {
    isUserRegistry:state.user.typeUser,
    user:state.user
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleDataDriver:(prop, key) => dispatch(onChangeDriver(prop, key)),
    handleModal:(prop) => dispatch(handlerModalLogin(prop))
  }
}

const JobOffert = ({ user, router, isUserRegistry, deviceType, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    //Esto carga las props iniciales
    let base = state.base;
    base.name = user.name || '';
    base.lastname = user.lastname || '';
    base.google_id = user.google_id || '';
    base.facebook_id = user.facebook_id || '';
    base.photo = user.photo || '';
    base.email = user.email || '';
    base.id = user._id || '';
    if (user.typeUser == 1) {
      let driver = user.driver;
      dispatch({ type: types.PROPS_DRIVER, payload: driver })
    }


    dispatch({ type: types.PROPS_BASE, payload: base })
  }, [user, state.typeUser]);
    
  useEffect(() => {
   let job_id = router.query.id
   fetchJobDetails(job_id);
  }, [router.query.id])

  const fetchJobDetails = async (job_id) => {
    try{
      const { data } = await axios.get(`/api/company/jobs/detail/${job_id}`)
      dispatch({ type: types.FETCH_DETAIL, payload:data.data});
    }catch(err){
      console.log(err)
    }
  }

  async function saveApply(){
    try{
      const header = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const apply = {
        job: state._id,
        company: state.company
      };
      await axios.post('/api/company/jobs/apply', apply, header);
      dispatch({type:types.SHOW_DRAWER, payload:true});
    }catch(e){
      console.log(e);
    }
  }

  const { title, logo, description, address, date } = state
  
  return (
    <>
      <MainLayout title='Welcome' user={user}>
        <WrapperSection row={22} mt={0}>
          <div className='job-offert'>
            <Row>
              <Col className='job-offert__detaill' span={13}>
                <div className="header"
                  style={{
                    backgroundImage: `url('/static/images/truck3.jpg')`
                  }}>
                  <Avatar size={130} src={logo} alt='image' />
                </div>
                <div>
                  <Title> {title} </Title>
                  <div>
                    <Text> Addres </Text>
                    <Text strong> {address} </Text> <Text strong > | </Text>
                    <Text> Date </Text>
                    <Text strong> { moment(date).format('MM DD YYYY')} </Text>
                  </div>
                </div>
                <Text className='description'>{description}</Text>
                {
                  !isUserRegistry ? <Button 
                  shape="round" 
                  size="large"
                  type='primary'
                  style={{
                    marginTop: 16,
                    width: '90%',
                    marginLeft: 12,
                  }}
                  onClick={()=> {
                    props.handleModal(true);
                  }}>Completa el login y aplica a esta posicion</Button> : 
                  <Button 
                  shape="round" 
                  size="large"
                  type='primary'
                  style={{
                    marginTop: 16,
                    width: '90%',
                    marginLeft: 12,
                  }}
                  onClick={saveApply}>Apply</Button>
                }
              </Col>
              <Col className='job-offert__list' span={10}>
              <Row justify='center' align='middle'>
                <Title level={3}>Busquedas relacionas</Title>
              </Row>
                <Row justify='center' align='middle'>
                  <JobListComp type='small' />
                </Row>
              </Col>
            </Row>
          </div>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(JobOffert)); 
