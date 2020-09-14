import React from 'react';
import Head from 'next/head'
import { Layout } from 'antd';
import HeaderComponent from '../header';
import './styles.scss';

const { Footer, Content } = Layout;

const MainLayout = ({children, title}) => (
    <>
        <Head>
            <title>{title}</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="/static/css/styles.css" rel="stylesheet"/>
        </Head>
        <Layout>
         <HeaderComponent/>
            <Content>
                {children}
            </Content>
            <Footer>Footer</Footer>
        </Layout>        
    </>
)

export default MainLayout;