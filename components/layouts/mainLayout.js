import React from 'react';
import Header from '../includes/header';
import Head from 'next/head'
import Footer from '../includes/footer';
import { Layout } from 'antd';
import '../../styles/index.less';

const { Content } = Layout;


const MainLayout = ({ children }) => (
    <>
        <Head>
            <title>My Awesome app</title>
        </Head>
        <Layout>
            <Header />
              <Content>
                  {children}
              </Content>
            <Footer />
        </Layout>
    </>
)

export default MainLayout;