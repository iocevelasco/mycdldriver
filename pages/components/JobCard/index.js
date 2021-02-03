import React from 'react';
import { withRouter } from 'next/router';
import { Card, Avatar, Typography, Button } from 'antd';
import Link from 'next/link';
import './styles.less';


const { Title } = Typography

const JobCardComponent = (props) => {
  const { item } = props;
  return (
    <div className="card-job-dstk-lg">
      <Card
        hoverable>
        <Link
          href={{
            pathname: '/job-offert',
            query: { id: item._id },
          }}
        >
          <div className="card-job-dstk-lg__container">
            <div className="card-job-dstk-lg__logo">
              <Avatar size={160} src={item.company.photo} />
            </div>
            <div className="card-job-dstk-lg__description">
              <Title className="card-job-dstk-lg__description__title" level={3}> {item.title} </Title>
              <div>
                <p> {item.description} </p>
              </div>
              <Button type="link">View more </Button>
            </div>
            <div className="card-job-dstk-lg__thumbnails" style={{ backgroundImage: "url(" + item.logo + ")" }} />
          </div>
        </Link>
      </Card>
    </div>
  )
}



export default withRouter(JobCardComponent);
