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
  title: "Position Name",
  image: "https://image.freepik.com/vector-gratis/truck-logo-vector-imagen-archivo_56473-238.jpg",
  postion_id: 0,
  description: "Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt.",
  address: "Miami",
  date: "12/04/23",
  expire_date: "12/05/23",
  company_name: "pepito",
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
    handleDataDriver:(prop, key) => dispatch(onChangeDriver(prop, key))
  }
}

const JobOffert = ({ user, router, isUserRegistry, ...props }) => {
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
  
  console.log('state',state)
  
  useEffect(() => {
   let job_id = router.query.id
   fetchJobDetails(job_id);
  }, [])

  const fetchJobDetails = async (job_id) => {
    try{
      const { data } = await axios.get(`/api/company/jobs/detail/${job_id}`)
      console.log('[jobOffert]', data);
      dispatch({ type: types.FETCH_DETAIL, payload:data.data});
    }catch(err){
      console.log(err)
    }
  }

  const onChange = (e, key) => {
    const newDash = state.dashboard;
    let value = "";
    switch (key) {
      default:
        value = e.target.value;
        newDash[key] = value;
        break;
    }
    dispatch({ type: types.ADD_NEW_DATA, payload: newDash })
  }
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 14 },
  }

  const { title, image, description, address, date } = state
  
  const formConfig = {
    base: state.base,
    driver: state.driver,
    isProfile:false,
    buttonApply: <Button 
    size='large' 
    shape="round"
    block
    type='primary'> Apply </Button>
  }
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
                  <Avatar size={130} src={image} alt='image' />
                </div>
                <div>
                  <Title> {title} </Title>
                  <div>
                    <Text> Addres </Text>
                    <Text strong> {address} </Text> <Text strong > | </Text>
                    <Text> Date </Text>
                    <Text strong> {date} </Text>
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
                  onClick={()=> props.handleModal(true)}>Completa el login y aplica a esta posicion</Button> : 
                  <Button 
                  shape="round" 
                  size="large"
                  type='primary'
                  style={{
                    marginTop: 16,
                    width: '90%',
                    marginLeft: 12,
                  }}
                  onClick={()=> dispatch({type:types.SHOW_DRAWER, payload:true})}>Apply</Button>
                }
              </Col>
              <Col className='job-offert__list' span={10}>
                <Row justify='center' align='middle'>
                  <JobListComp/>
                </Row>
              <Drawer
                title='Completa tu postulacion'
                placement="right"
                closable={true}
                width={680}
                mask={false}
                onClose={()=> {
                dispatch({type:types.SHOW_DRAWER})}}
                visible={state.visible}>
                  {
                    !state.showSucces ? <FormUserDriver {...formConfig}/> : <MessageSucces/>
                  }
                </Drawer>
              </Col>
            </Row>
          </div>
        </WrapperSection>
      </MainLayout>
    </>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(JobOffert)); 
