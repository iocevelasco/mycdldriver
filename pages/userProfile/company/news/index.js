import React from "react";
import { Row, Col} from "antd";
import axios from 'axios';
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import FormNews  from './FormNews';

const FormList = (props) => {
    const createNews = async (fields) => {

        dispatch({ type: types.LOADING, payload: true });
        await axios.post('/api/company/jobs', fields, header)
          .then(() => {
            createSuccess();
          })
          .catch((err) => {
            console.log(err);
            fetchJobList();
            notification['error']({
              message: 'error',
              description:
                "Sorry! We couldn't create this position, please try again. "
            });
        })
    };
    
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