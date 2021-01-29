import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJobPositionData } from '@store/reducers/landing_reducer';
import { withRouter } from 'next/router';
import { List, Card, Avatar, Typography, Button, Image, Row, Col } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import JobCardComponent from 'components/JobCard';

const { Title } = Typography

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    deviceType: state.landing.deviceType
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query))
  }
}

const JobListComp = ({ jobs, deviceType, fetchJobs, type }) => {
  useEffect(() => {
    fetchJobs('');
  }, [])

  const handlerTypeComponent = (type, item) => {
    let components;
    switch (type) {
      case 'small':
        components = <DescriptionSmall item={item} />
        break;
      case 'large':
        if (deviceType === 'desktop') components = <DescriptionDesktop item={item} />
        else components = <DescriptionMobile item={item} />
        break;
    }
    return components
  }

  return (
    <>
      <List
        bordered={false}
        style={{ width: '100%' }}
        dataSource={jobs}
        pagination={{
          pageSize: 10,
        }}
        renderItem={item => (
          <List.Item>
            <JobCardComponent item={item} />
          </List.Item>
        )}
      />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(JobListComp);