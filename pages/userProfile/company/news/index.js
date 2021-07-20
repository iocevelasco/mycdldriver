import React from "react";
import { Row, Col} from "antd";
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import FormNews  from './FormNews';

const FormList = (props) => {

    return (
        <WrapperDashboard>
            <Row display='flex' justify='start'>
                <Col span={24}>
                    <WrapperSection row={24}>
                        <div>
                            <FormNews />
                        </div>
                    </WrapperSection>
                </Col>
            </Row>
        </WrapperDashboard>
    );
};

export default FormList;