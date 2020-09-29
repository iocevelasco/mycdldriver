import React from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Button, Space } from 'antd';

const { Header } = Layout;


const HeaderComp = () => (
    <>
        <Header className='header-component'>
           <Row justify='space-between' align='middle'>
             <Col span={4}> 
                <img src='/static/images/logo.svg' />
             </Col>
             <Col span={4}>
             <Space span={16}>
                <Button type="secondary" size='large'>
                    COMPANY
                </Button>
                <Button type="secondary" size='large'>
                     LOGIN
                </Button>
             </Space>
             </Col>
           </Row>
        </Header>
    </>
)

export default HeaderComp;