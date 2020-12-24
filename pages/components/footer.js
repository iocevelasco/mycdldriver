import React from 'react';
import Link from 'next/link';
import { Layout, Row, Col, Typography } from 'antd';

const { Text, Title } = Typography;

const { Footer } = Layout;


const FooterComp = () => (
    <>
        <Footer className='footer-component'>
            <Row gutter={[32]} justify='center' align='middle'>
                <Col xs={24} md={4} lg={4}>
                    <img src='/static/images/logo-white.svg' />
                </Col>
                <Col  xs={24} md={4} lg={4} >
                    <Title level={4}>Contact Us</Title>
                    <div className='footer-component__contact-data'>
                        <Text>+880 12345678</Text>
                        <Text>youremail@gmail.com</Text>
                        <Text>+880 12345678</Text>
                    </div>
                </Col>
            </Row>
            <Row justify='center' align='middle'>
                <Text>Copyright & Design MyCDLDRivers</Text>
            </Row>
        </Footer>
    </>
)

export default FooterComp;