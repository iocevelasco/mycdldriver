import React from "react";
import { Row, Col } from "antd";
import { CardNews } from '../../components/Cards';


const NewsList = (props) => {

    return (
        <div>
            <Row style={{marginBottom: 30}}>
                <Col span={24}>
                <CardNews origin = 'home' />
                </Col>
            </Row>
        </div>
    );
};



export default NewsList;