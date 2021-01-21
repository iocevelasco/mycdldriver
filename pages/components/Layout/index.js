import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import { SpinnerComp } from 'components/helpers';
import DrawerLayout from 'components/DrawerLayout';
import { connect } from 'react-redux';
import { getCurrentLocation, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import ModalLogin from 'components/login';
import { Layout, Row, Col, Button, Avatar, Typography, Space } from 'antd';
import { UserOutlined, MenuFoldOutlined } from '@ant-design/icons';

import '@styles/index.less';
import './styles.less';

const { Text } = Typography;
const { Content, Header } = Layout;

function mapStateToProps(state) {
    const { user, landing } = state;
    return {
        user: user,
        token: user.token,
        isLoading: landing.isLoading,
        isLogin: user.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleModal: (prop) => dispatch(handlerModalLogin(prop)),
        handleLocation: (location) => dispatch(getCurrentLocation(location)),
        handleDeviceType: (props) => dispatch(deviceType(props)),
        fetchUserProps: (p) => dispatch(fetchUserProps(token)),
        fetchUserData: (token, typeUser) => dispatch(fetchUserData(token, typeUser))
    }
};

const MainLayout = ({
    children,
    title,
    user,
    isLoading,
    router,
    bgActive,
    deviceType,
    token,
    isLogin,
    ...props }) => {
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        const tokenLS = localStorage.getItem('token');
        const userTypeLS = localStorage.getItem('typeUser');
        if (tokenLS) {
            if (router.pathname !== "/new_user") {
                props.fetchUserData(tokenLS, userTypeLS);
            }
        }
        if (user) {
            if (user.token !== null) {
                localStorage.setItem("token", user.token);
                localStorage.setItem("typeUser", user.typeUser);
            }
        }
        props.handleDeviceType(deviceType)
    }, []);

    let bg = bgActive ? {
        background: `url('/static/images/bg-routes.jpg')`,
        backgroundSize: 'contain',
    } : {
            background: `#fff`,
            backgroundSize: 'contain',
        }
    console.log('isLoading', isLoading)
    return (<>
        <Head>
            <title> My CDL Driver </title>
            <link rel="shortcut icon" href="../static/images/favicon.ico" />

            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-TKQYTSNDNE" />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TKQYTSNDNE', {
                page_path: window.location.pathname,
                }); `,
                }}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    var _smartsupp = _smartsupp || {};
                    _smartsupp.key = '4d2506c540fb4374b23fd72bad60c42be37284df';
                    window.smartsupp||(function(d) {
                        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                        c.type='text/javascript';c.charset='utf-8';c.async=true;
                        c.src='//www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                    })(document);`,
                }}
            />
        </Head>
        <Layout>
            <Header className='header-component'>
                <SpinnerComp active={isLoading} />
                <Row justify='space-between' align='middle'>
                    <Col span={4}>
                        <Link href="/">
                            <a >
                                <img src='/static/images/logo.svg' />
                            </a>
                        </Link>
                    </Col>
                    <Col span={10}>
                        {
                            user.isLogin ?
                                <Row justify='end' align='middle'>
                                    <Col xs={0} xl={16}>
                                        <Text strong style={{ float: 'right', marginRight: 10 }}>{user.name + " " + user.lastname}</Text>
                                    </Col>
                                    <Col xs={6} xl={2}>
                                        <Avatar icon={<UserOutlined />} src={user.photo} />
                                    </Col>
                                    <Col xs={18} xl={6}>
                                        <Button
                                            style={{ color: '#FF2A39' }}
                                            icon={<MenuFoldOutlined />}
                                            onClick={() => setVisible(true)} >
                                            Account
                                        </Button>
                                    </Col>
                                </Row>
                                :
                                <Row justify='end' align='middle'>
                                    <Button
                                        shape="round"
                                        icon={<UserOutlined />}
                                        onClick={() => {
                                            props.handleModal(true);
                                            props.handleLocation(router.pathname);
                                            window.localStorage.removeItem('token');
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
            <DrawerLayout visible={visible} setVisible={setVisible} />
        </Layout>
    </>
    )
}

MainLayout.propTypes = {
    children: propTypes.oneOfType([arrayOf(node), node]).isRequired,
    user: propTypes.object,
    loading: propTypes.bool,
    router: propTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
