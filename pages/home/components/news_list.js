import React from "react";
import { Row, Col, Carousel} from "antd";
import { CardNews } from '../../components/Cards';


const NewsList = (props) => {
    const { fetchNews } = props;

    return (
        <div>
            <Row style={{marginBottom: 30}}>
                <Col span={24}>
                <CardNews fetchNews={fetchNews} />
                </Col>
            </Row>
        </div>
    );
};



export default NewsList;