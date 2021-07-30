import React, {useEffect} from 'react';
import { WrapperSection, WrapperDashboard } from "components/helpers";
import axios from 'axios';
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
  const {router} = props

  useEffect(() => {
    let new_id = router.query.id;
    getNew(new_id)
    props.activeLoading(false);
  }, [router.query.id]);


  const getNew = async (id) => {
    await axios.get(`/api/blog/${id}`)
        .then((response) => {
            console.log(response.data.data)
    })
    .catch((e) => {

    })
  }


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