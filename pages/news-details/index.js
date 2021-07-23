import React from 'react';
import { WrapperSection, WrapperDashboard } from "components/helpers";
import { Row, Col } from 'antd';
import NewsRow from '../components/NewsRow';

const NewsDetails = (props) => {
    return(
        <WrapperDashboard>
            <Row display='flex' justify='start'>
                <Col span={24}>
                    <WrapperSection row={24}>
                        <div>
                            <NewsRow/>
                        </div>
                    </WrapperSection>
                </Col>
            </Row>
        </WrapperDashboard>
    );
}

export default NewsDetails;