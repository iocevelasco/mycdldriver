import React from "react";
import { Row, Col, Carousel} from "antd";
import useMobileDetect from "use-mobile-detect-hook";
import {CardNews } from '../../components/Cards';


const NewsList = (props) => {
    const detectMobile = useMobileDetect();

    return (
        <div>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                <CardNews/>
                </Col>
            </Row>
        </div>
    );
};



export default NewsList;