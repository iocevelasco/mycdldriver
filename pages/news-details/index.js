import React, {useEffect} from 'react';
import { WrapperSection, WrapperDashboard } from "components/helpers";
import { connect } from "react-redux";
import { Row, Col } from 'antd';
import NewsRow from '../components/NewsRow';

function mapDispatchToProps(dispatch) {
  return {
    activeLoading: (e) => dispatch(activeLoading(e)),
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
  connect(mapDispatchToProps)(NewsDetails)
);