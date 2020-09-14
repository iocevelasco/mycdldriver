import React from 'react';
import Head from 'next/head'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const MainLayout = (props) => (
    <>
        <Head>
            <title>My Awesome app</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="/static/css/styles.css" rel="stylesheet"/>
        </Head>
        <Layout>
            <Header>Header</Header>
            <Content>
                {props.children}
            </Content>
            <Footer>Footer</Footer>
        </Layout>        
    </>
)

export default MainLayout;