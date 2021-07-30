import React, {useEffect} from 'react';
import { WrapperSection, WrapperDashboard } from "components/helpers";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { activeLoading } from '@store/reducers/landing_reducer';
import { Row, Col } from 'antd';
import NewsRow from '../components/NewsRow';

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const NewsDetails = (props) => {

    useEffect(() => {
      props.activeLoading(false);
    }, []);

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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewsDetails)
);