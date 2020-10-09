import React, {useState} from 'react';
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
    Typography 
} from 'antd';
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import '../styles/index.less';
const { Text } = Typography;
const { Content, Header } = Layout;


const MainLayout = ({ children, title, user }) => {
    const [visible, setVisible] = useState(false)
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
                            <Row justify='end' align='middle'>
                                <Col span={8}>
                                    <Text strong>{user.displayName}</Text>
                                </Col>
                                <Col span={4}>
                                    <Avatar src={user.picture} />
                                </Col>
                            </Row>: 
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
                title="Welcome!"
                visible={visible}
                onOk={()=>setVisible(false)}
                onCancel={()=>setVisible(false)}
                >
                <Button icon={<GoogleOutlined />} block size='large' >
                    Loggin with facebook
                </Button>

                <Button block size='large' style={{background:'#1877f2'}} icon={<FacebookOutlined />} >
                       Continue with facebook     
                </Button>
            </Modal>
        </Layout>
    </>
    )
}
export default MainLayout;