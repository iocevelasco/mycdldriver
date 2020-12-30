import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import { SpinnerComp } from 'components/helpers';
import { connect } from 'react-redux';
import { logoutUser, getCurrentLocation, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import ModalLogin from 'components/login';
import { Layout, Row, Col, Button, Avatar, Typography, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

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

    useEffect(() => {
        const tokenLS = localStorage.getItem('token');
        const userTypeLS = localStorage.getItem('typeUser');
        if (tokenLS) {
            props.fetchUserData(tokenLS, userTypeLS);
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
    const menu = (
        <Menu style={{ width: '200px', float: 'right' }}>
            <Menu.Item>
                <Link href={user.typeUser === 1 ? '/userProfile/driver/profile' : '/userProfile/company/profile'}>
                    <Button type='link'>
                        Profile
                </Button>
                </Link>
            </Menu.Item>
            <Menu.Item >
                <Button type='link' onClick={() => {
                    props.logoutUser();
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
                        <Link href="/">
                            <a >
                                Home
                            </a>
                        </Link>
                    </Col>
                    <Col span={10}>
                        {
                            user.typeUser || user.isLoading ?
                                <Dropdown overlay={menu}>
                                    <Row justify='end' align='middle'>
                                        <Space size='large'>
                                            <DownOutlined />
                                            <Text strong>{user.name + " " + user.lastname}</Text>
                                            <Avatar src={user.photo} />
                                        </Space>
                                    </Row>
                                </Dropdown>
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
