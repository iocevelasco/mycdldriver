import React from 'react';
import Header from './header';
import Head from 'next/head'
import Footer from './footer';
import { Layout } from 'antd';
import '../styles/index.less';

const { Content } = Layout;


const MainLayout = ({ children, title }) => (
    <>
        <Head>
            <title>{`My CDL Driver | ${title}`}</title>
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