import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import SpinnerComp from '../components/loading';
import {connect} from 'react-redux';
import { logoutUser, getCurrentLocation } from '@store/reducers/user_reducer';
import { handlerModalLogin } from '@store/reducers/landing_reducer';
import ModalLogin from 'components/modal_login';
import { 
    Layout, 
    Row, 
    Col, 
    Button, 
    Avatar, 
    Typography,
    Menu, 
    Dropdown,
    Space
} from 'antd';
import { 
    UserOutlined,
    DownOutlined} 
from '@ant-design/icons';

import '../styles/index.less';

const { Text, Title } = Typography;
const { Content, Header } = Layout;

function mapStateToProps(state){
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch){
    return {
      handleLogout: () => dispatch(logoutUser()),
      handleModal:(prop) => dispatch(handlerModalLogin(prop)),
      handleLocation:(location) => dispatch(getCurrentLocation(location))
    }
  };

const MainLayout = ({ children, title, user, loading, router, bgActive, ...props }) => {
    const [loader, setLoader] = useState(loading);
    
    const [userProps, setUserProps] = useState({ 
        name:'',
        email:'',
        id:'',
        photo:'',
        typeUser: ''
    });

    useEffect(()=>{
        if(!user) return
        const { name, lastname, email, photo, _id, typeUser} = user;
        setUserProps({ 
            name:name + " " + lastname,
            email:email,
            id:_id ,
            photo:photo,
            typeUser: typeUser
        }) 
    },[user])

    useEffect(()=>{
        setLoader(loading);
        if(loading){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.body.style.overflowY = "hidden"
        }else{
            document.body.style.overflowY = "auto"
        }
    },[loading]);
    let bg = !bgActive ? { 
        background: `url('/static/images/bg-routes.jpg')`,
        backgroundSize:'contain',
        } : {}
    const menu = (
        <Menu style={{width: '200px', float:'right'}}>
          <Menu.Item>
            <Link href={userProps.typeUser === 1 ? '/userProfile/driver' : '/userProfile/company'}>
                <Button type='link'>
                    Profile
                </Button>
            </Link>
          </Menu.Item>
          <Menu.Item >
            <Button type='link' onClick={()=>{
                setLoader(true);
                props.handleLogout();
                router.push('/logout')
                }} >
                Logout
            </Button>
          </Menu.Item>
        </Menu>
      );

    return (<>
        <Head>
            <title>{`My CDL Driver | ${title}`}</title>
            <link rel="shortcut icon" href="../static/images/favicon.ico" />
        </Head>
        <Layout>
            <Header className='header-component'>
                {loader ? <SpinnerComp/> : null}
                <Row justify='space-between' align='middle'>
                    <Col span={4}>
                        <Link href="/">
                           <img src='/static/images/logo.svg' />
                        </Link>
                    </Col>
                    <Col span={10}>
                    {
                        user.isLogin ?
                        <Dropdown overlay={menu}>
                             <Row justify='end' align='middle'>
                                <Space size='large'>
                                <DownOutlined /> 
                                <Text strong>{userProps.name}</Text> 
                                <Avatar src={userProps.photo} />
                             </Space>
                            </Row>
                       </Dropdown>
                     : 
                        <Row justify='end' align='middle'>
                            <Button 
                            shape="round" 
                            icon={<UserOutlined/>}
                            onClick={()=> {
                                props.handleModal(true);
                                props.handleLocation(router.pathname);
                            }}
                            type="secondary" size='large'>
                                Login
                            </Button>
                        </Row>   
                    }
                    </Col>
                </Row>
            </Header>
            <Content>
                <div style={bg}>
                    {children}
                </div>
            </Content>
            <Footer />
            <ModalLogin />
        </Layout>
    </>
    )
}

MainLayout.propTypes = {
  children: propTypes.array.isRequired,
  title: propTypes.string.isRequired,
  user: propTypes.object,
  loading: propTypes.bool.isRequired,
  router :propTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
