import React, {useState, useEffect} from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import SpinnerComp from '../components/loading';
import { 
    Layout, 
    Row, 
    Col, 
    Button, 
    Modal, 
    Avatar, 
    Typography,
    Menu, 
    Dropdown,
    Space
} from 'antd';
import { 
    GoogleOutlined, 
    FacebookOutlined, 
    DownOutlined} 
from '@ant-design/icons';

import '../styles/index.less';

const { Text, Title } = Typography;
const { Content, Header } = Layout;

const MainLayout = ({ children, title, user, loading, router }) => {
    const [visible, setVisible] = useState(false);
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
                            <img style={{height: 50}} src='/static/images/logo.svg' />
                        </Link>
                    </Col>
                    <Col span={10}>
                    {
                        user ?
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
                                onClick={()=>setVisible(true)}
                                type="secondary" size='large'>
                                    LOGIN
                                </Button>
                            </Row>   
                        }
                    </Col>
                </Row>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer />
            <Modal
                visible={visible}
                footer={null}
                width={380}
                onOk={()=>setVisible(false)}
                onCancel={()=>setVisible(false)}
                >
                <div className='modal-login'>
                    <div className='title'>
                        <Title level={3}>Welcome!</Title>
                        <Text>Sign in for MyCDL</Text>
                    </div>
                    <Button onClick={()=>{
                            setLoader(true);
                            setVisible(false);
                            router.push('/auth/google');
                        }} icon={<GoogleOutlined />} block size='large' >
                      Continue with Google
                    </Button>

                    <Button onClick={()=>{
                            setLoader(true);
                            setVisible(false);
                            router.push('/auth/facebook');
                        }} block size='large' style={{background:'#1877f2', color:'#fff'}} icon={<FacebookOutlined />} >
                        Continue with facebook     
                    </Button>
                </div>
            </Modal>
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

export default withRouter(MainLayout);