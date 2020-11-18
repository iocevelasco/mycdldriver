import React, { useEffect, useReducer, useState } from 'react';
import MainLayout from '../../components/layout';
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Button,
  Drawer
} from 'antd';
import FormUserDriver from 'components/FormUserDriver';
import { MessageSuccess } from 'components/helpers';
import { WrapperSection } from 'components/helpers';
import { withRouter } from 'next/router';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import { connect } from 'react-redux';
import JobListComp from '../home/components/job_offerts';
import moment from 'moment';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;

const initialState = {
  showSuccess:false,
  title: '',
  logo: '',
  can_apply: false,
  postion_id: 0,
  description: '',
  address:'',
  date: '',
  expire_date: '',
  company_name: '',
  company:{
    tradename: ''
  },
}

const types = {
  FETCH_DETAIL: 'FETCH_DETAIL',
  SHOW_SUCCESS:'SHOW_SUCCESS',
  PROPS_APPLY:'PROPS_APPLY',
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
    case types.SHOW_SUCCESS:
     return { ...state, showSuccess:action.payload }
    case types.PROPS_APPLY:
     return { ...state, can_apply:action.payload }
    default:
      throw new Error('Unexpected action');
  }
}

function mapStateToProps(state) {
  return {
    isUserRegistry:state.user.typeUser,
    user:state.user,
    isLogin:state.user.isLogin
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleModal:(prop) => dispatch(handlerModalLogin(prop))
  }
}

const JobOffert = ({ user, router, isUserRegistry, deviceType, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if(props.isLogin && user.typeUser === 0){
      dispatch({ type: types.SHOW_DRAWER, payload:true})
    } 
  },[props.isLogin])


  useEffect(() => {
   let job_id = router.query.id
   fetchJobDetails(job_id);
  }, [router.query.id])

  const fetchJobDetails = async (job_id) => {
    try{
      let applyJob = {
        id: job_id
      };
      if(props.isLogin && user.typeUser === 1){
        applyJob.driver = user._id;
      }
      const { data } = await axios.post(`/api/company/jobs/detail`, applyJob);
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
        job: router.query.id,
        company: state.company
      };
      await axios.post('/api/company/jobs/apply', apply, header);
      dispatch({type:types.SHOW_SUCCESS, payload:true});
      dispatch({type:types.PROPS_APPLY, payload:false});
    }catch(e){
      console.log(e);
    }
  }

  
  return (
    <>
      <MainLayout title='Welcome'>
        <WrapperSection row={22} mt={0}>
          <div className='job-offert'>
            <Row>
              <Col className='job-offert__detaill' span={13}>
                <div className="header"
                  style={{
                    backgroundImage: `url('/static/images/truck3.jpg')`
                  }}>
                  <Avatar size={130} src={state.logo} alt='image' />
                </div>
                <div>
                  <Title> {state.title} </Title>
                  <Title level={5}> {state.company.tradename} </Title>
                  <div>
                    <Text> Addres </Text>
                    <Text strong> {state.address} </Text> <Text strong > | </Text>
                    <Text> Date </Text>
                    <Text strong> { moment(state.date).format('MM DD YYYY')} </Text>
                  </div>
                  <div>
                    <Text> Phone </Text>
                    <Text strong> {state.areaCode} - {state.phoneNumber} </Text> <Text strong > | </Text>
                    <Text> Email </Text>
                    <Text strong> {state.email} </Text>
                  </div>
                </div>
                <Text className='description'>{state.description}</Text>
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
                  }}>Complete the login and apply to this position</Button> : 
                    state.can_apply ? 
                      isUserRegistry == 2 ?
                        <Button 
                        shape="round" 
                        size="large"
                        type='primary'
                        style={{
                          marginTop: 16,
                          width: '90%',
                          marginLeft: 12,
                        }}
                        disabled>Available only for drivers</Button>:
                          <Button 
                          shape="round" 
                          size="large"
                          type='primary'
                          style={{
                            marginTop: 16,
                            width: '90%',
                            marginLeft: 12,
                          }}
                          onClick={saveApply}>Apply</Button>:
                      <Button 
                      shape="round" 
                      size="large"
                      type="primary"
                      style={{
                        marginTop: 16,
                        width: '90%',
                        marginLeft: 12,
                      }}
                      disabled>
                        You already applied for this job
                      </Button>
                }
              </Col>
              <Col className='job-offert__list' span={10}>
              <Row justify='center' align='middle'>
                <Title level={3}>Related searches</Title>
              </Row>
                <Row justify='center' align='middle'>
                  <JobListComp type='small' />
                </Row>
              </Col>
            </Row>
          </div>
          <Drawer
            title='Success apply' 
            placement="right"
            closable={true}
            width={720}
            visible={state.showSuccess}
            onClose={()=> {
              dispatch({type:types.SHOW_SUCCESS, payload:false});  
            }}>
              <MessageSuccess
                title="You applied successfully"
                subTitle = "Thank you for applying to this vacancy, the company will contact you as soon as possible."
              />
            </Drawer>
          
          <Drawer
            title='Complete your profile' 
            placement="right"
            closable={true}
            width={680}
            onClose={()=> {
              dispatch({type:types.SHOW_DRAWER, payload:false});  
            }}
            visible={state.visible}>
              <FormUserDriver  
              action={
                <Button 
                shape="round" 
                size="large"
                type='primary'
                style={{
                  width: '100%'
                }}
                onClick={saveApply}
                > 
                  Send request
              </Button>}  />
          </Drawer>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(JobOffert)); 
