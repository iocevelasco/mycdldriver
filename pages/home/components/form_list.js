import React from "react";
import { Row, Col} from "antd";
import { FormNews } from '../../components/FormNews';

const FormList = (props) => {

    return (
        <div>
            <Row>
                <Col span={24}>
                <FormNews/>
                </Col>
            </Row>
        </div>
    );
};

export default FormList;