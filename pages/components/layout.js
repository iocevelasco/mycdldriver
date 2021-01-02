import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import { SpinnerComp } from 'components/helpers';
import DrawerLayout from 'components/DrawerLayout';
import { connect } from 'react-redux';
import { logoutUser, getCurrentLocation, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import ModalLogin from 'components/login';
import { Layout, Row, Col, Button, Avatar, Typography, Space } from 'antd';
import { UserOutlined, MenuFoldOutlined } from '@ant-design/icons';

import '@styles/index.less';

const { Text } = Typography;
const { Content, Header } = Layout;

function mapStateToProps(state) {
    const { user, landing } = state;
    return {
        user: user,
        token: user.token,
        isLoading: landing.isLoading,
        isAuthenticated: landing.isLogin
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logoutUser()),
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
    isAuthenticated,
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
            <title>{`My CDL Driver | ${title}`}</title>
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
        </Head>
        <Layout>
            <Header className='header-component'>
                {/* <SpinnerComp active={isLoading} /> */}
                <Row justify='space-between' align='middle'>
                    <Col span={4}>
                        <Link href="/">
                            <a >
                                <img src='/static/images/logo.svg' />
                            </a>
                        </Link>
                    </Col>
                    <Col span={10}>
                        <Link href="/">
                            <a >
                                Home
                            </a>
                        </Link>
                    </Col>
                    <Col span={10}>
                        {
                            user.typeUser || user.isLoading ?
                                <Row justify='end' align='middle'>
                                    <Space size='large'>
                                        <Button
                                            style={{ color: '#FF2A39' }}
                                            icon={<MenuFoldOutlined />}
                                            onClick={() => setVisible(true)} >
                                            Account
                                        </Button>
                                        <Text strong>{user.name + " " + user.lastname}</Text>
                                        <Avatar icon={<UserOutlined />} src={user.photo} />
                                    </Space>
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
    title: propTypes.string.isRequired,
    user: propTypes.object,
    loading: propTypes.bool,
    router: propTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
