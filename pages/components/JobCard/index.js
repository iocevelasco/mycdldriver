import React from 'react';
import { withRouter } from 'next/router';
import './styles.less';
import JobCardDesktop from './Variations/JobCardDesktop';
import JobCardMobile from './Variations/JobCardMobile';
import useMobileDetect from 'use-mobile-detect-hook';
import classnames from 'classnames';

const JobCardComponent = (props) => {
  const detectMobile = useMobileDetect();

  const jobListContainer = classnames({
    'card-job--lg': !detectMobile.isMobile(),
    'card-job--small': detectMobile.isMobile(),
  });

  return (
    <div className={jobListContainer}>
      {
        detectMobile.isMobile() ?
          <JobCardMobile item={props.item} />
          :
          <JobCardDesktop type={props.type} item={props.item} />
      }
    </div>
  )
}

export default withRouter(JobCardComponent);
