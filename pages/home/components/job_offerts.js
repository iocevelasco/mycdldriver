import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJobPositionData } from '@store/reducers/landing_reducer';
import { withRouter } from 'next/router';
import { List, Card, Avatar, Typography } from 'antd';
import JobCardComponent from 'components/JobCard';
import classnames from 'classnames';

const { Title } = Typography

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    deviceType: state.landing.deviceType
  }
}

const JobListComp = ({ jobs, fetchJobs, type }) => {

  var jobListContainer = classnames({
    'home__jobs-list': type == 'large',
    'job-offert__jobs-list': type == 'small'
  });

  return (
    <div className={jobListContainer}>
      <List
        bordered={false}
        style={{ width: '100%' }}
        dataSource={jobs}
        pagination={{
          pageSize: 10,
        }}
        renderItem={item => (
          <List.Item>
            <JobCardComponent type={type} item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default connect(mapStateToProps)(JobListComp);