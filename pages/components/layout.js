import React, { useState, useEffect } from 'react';
import propTypes, { arrayOf, node } from 'prop-types';
import { withRouter } from 'next/router';
import Head from 'next/head'
import Footer from './footer';
import Link from 'next/link';
import { SpinnerComp } from 'components/helpers';
import { connect } from 'react-redux';
import { logoutUser, getCurrentLocation, settingAppHeader, fetchUserData } from '@store/reducers/user_reducer';
import { handlerModalLogin, deviceType } from '@store/reducers/landing_reducer';
import ModalLogin from 'components/login';
import { Layout, Row, Col, Button, Avatar, Typography, Menu, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';

import '@styles/index.less';

const { Text } = Typography;
const { Content, Header } = Layout;

function mapStateToProps(state) {
    return {
        user: state.user,
        isLoading: state.landing.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logoutUser()),
        handleModal: (prop) => dispatch(handlerModalLogin(prop)),
        handleLocation: (location) => dispatch(getCurrentLocation(location)),
        handleDeviceType: (props) => dispatch(deviceType(props)),
        fetchUserProps: (p) => dispatch(fetchUserProps(token)),
        settingAppHeader: (authProps) => dispatch(settingAppHeader(authProps)),
        fetchUserData: (token) => dispatch(fetchUserData(token))
    }
};

const MainLayout = ({ children, title, user, isLoading, router, bgActive, deviceType, ...props }) => {

    const [userProps, setUserProps] = useState({
        name: '',
        email: '',
        id: '',
        photo: '',
        typeUser: '',
        token: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            props.fetchUserData(token);
        }
        if (user) {
            if (user.token !== null) {
                localStorage.setItem("token", user.token);
                const header = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                let authProps = {
                    header,
                    token
                }
                props.settingAppHeader(authProps);
            }
        }

        if (user) {
            const { name, lastname, email, photo, _id, typeUser } = user;
            setUserProps({
                name: name + " " + lastname,
                email: email,
                id: _id,
                photo: photo,
                typeUser: typeUser
            });
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
                <Link href={userProps.typeUser === 1 ? '/userProfile/driver/profile' : '/userProfile/company/profile'}>
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
