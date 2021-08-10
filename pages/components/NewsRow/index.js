import React from 'react';
import axios from 'axios';
import { Row, Col, Typography, Image, notification } from 'antd';
import './styles.less'

const {Title, Text, Paragraph} = Typography

const NewsRow = (props) => {

    const {notice} = props

    return(
        <Row justify='center'>
            <Col xs={22} lg={20}>
                <div className="news-details__top">
                    <div className="news-details__top--title">
                        <Title level={2}> 
                            {notice.title}
                        </Title>
                    </div>
                </div>
            </Col>
            <Col xs={22} lg={20}>
                <div className="news-details__img" align="center">
                  <Image width={'100%'} src={notice.image}></Image>
                </div>
            </Col>
            <Col xs={22} lg={20}>
                <div  className='news_details-description'>
                    {notice.description}
                </div>
            </Col>
        </Row>
    );
}

export default NewsRow;