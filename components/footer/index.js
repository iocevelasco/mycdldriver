import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from '../header';
import './styles.scss';

const { Footer } = Layout;

const MainLayout = ({children, title}) => (
    <>
      <Footer> 
        Footer
      </Footer>
    </>
)

export default MainLayout;