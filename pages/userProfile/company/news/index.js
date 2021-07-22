import React from "react";
import { Row, Col, notification } from "antd";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import FormNews  from './FormNews';


// CONNECT WITH REDUX
function mapStateToProps(state) {
    return {
      user: state.user
    }
}


const FormList = (props) => {
    const { user } = props;

    const header = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    const createNews = async (fields) => {

        await axios.post('/api/blog', fields, header)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err);
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
                            <FormNews createNews={createNews}/>
                        </div>
                    </WrapperSection>
                </Col>
            </Row>
        </WrapperDashboard>
    );
};

export default withRouter(
    connect(mapStateToProps)(FormList)
);