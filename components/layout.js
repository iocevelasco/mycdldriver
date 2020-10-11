import React, {useState, useEffect} from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import { 
    Layout, 
    Row, 
    Col, 
    Button, 
    Modal, 
    Avatar, 
    Typography,
    Menu, 
    Dropdown 
} from 'antd';
import { 
    GoogleOutlined, 
    FacebookOutlined, 
    DownOutlined} 
from '@ant-design/icons';

import '../styles/index.less';

const { Text, Title } = Typography;
const { Content, Header } = Layout;

const MainLayout = ({ children, title, user, router }) => {
    const [visible, setVisible] = useState(false);

    const [userProps, setUserProps] = useState({ 
        name:'',
        email:'',
        id:'',
        photo:'',
    });

    useEffect(()=>{
        if(!user) return
        const { displayName, emails, photos, id} = user;
        setUserProps({ 
            name:displayName,
            email:emails[0].value,
            id:id,
            photo:photos[0].value,
        }) 
    },[user])

    
    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              1st menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              2nd menu item
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              3rd menu item
            </a>
          </Menu.Item>
          <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
      );

    return (<>
        <Head>
            <title>{`My CDL Driver | ${title}`}</title>
        </Head>
        <Layout>
            <Header className='header-component'>
                <Row justify='space-between' align='middle'>
                    <Col span={4}>
                        <Link href="/">
                            <img style={{height: 50}} src='/static/images/logo.svg' />
                        </Link>
                    </Col>
                    <Col span={6}>
                    {
                        user ?
                        <Dropdown overlay={menu}>
                             <Row justify='end' align='middle'>
                                <Col span={8}>
                                    <Text strong>{userProps.name}</Text>
                                </Col>
                                <Col span={4}>
                                    <Avatar src={userProps.photo} />
                                </Col>
                            </Row>
                       </Dropdown>
                     : 
                            <Row justify='end' align='middle'>
                                <Link >
                                    <Button 
                                    onClick={()=>setVisible(true)}
                                    type="secondary" size='large'>
                                        LOGIN
                                    </Button>
                                </Link>
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
                    <Button onClick={()=>router.push('/auth/google')} style={{ color:'#1877f2'}}  icon={<GoogleOutlined />} block size='large' >
                        Loggin with Google
                    </Button>

                    <Button onClick={()=>router.push('/auth/facebook')} block size='large' style={{background:'#1877f2', color:'#fff'}} icon={<FacebookOutlined />} >
                        Continue with facebook     
                    </Button>
                </div>
            </Modal>
        </Layout>
    </>
    )
}
export default withRouter(MainLayout);