import React from 'react';
import { WrapperSection } from "components/helpers";
import { Row, Col } from 'antd';
import NewsRow from '../components/NewsRow';

const NewsDetails = () => {
    return(
        <WrapperSection row={18}>
            <Row>
                <Col span={20}>
                <NewsRow/>
                </Col>
            </Row>
        </WrapperSection>
    );
}

export default NewsDetails;