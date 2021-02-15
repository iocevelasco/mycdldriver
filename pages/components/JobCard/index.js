import React from 'react';
import { withRouter } from 'next/router';
import { Card, Avatar, Typography, Button } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import './styles.less';


const { Title, Text } = Typography

const JobCardComponent = (props) => {
  console.log("props", props)
  const { item } = props;
  return (
    <div className="card-job-dstk-lg">
      <Card
        hoverable
        cover={<img alt="logo" src={item.logo} />}
      >
        <Link
          href={{
            pathname: '/job-offert',
            query: { id: item._id },
          }}
        >
          <div className="card-job-dstk-lg__container">
            <div className="card-job-dstk-lg__header">
              <div className="card-job-dstk-lg__header__title" >
                <Title level={4}> {item.title} </Title>
                <Text>
                  {item.company.address} |  {item.company.address2}
                </Text>
              </div>
              <div className="card-job-dstk-lg__header__company">
                <Avatar shape="square" size={60} src={item.company.photo} />
                <p className="card-job-dstk-lg__description__title" level={3}> {item.company.tradename} </p>
              </div>
            </div>
            <div className="card-job-dstk-lg__detail">
              <div>
                <p> {item.description} </p>
                <Text type="secondary" > {moment(item.date, "YYYYMMDD").fromNow()}</Text>
              </div>
              <Button type="primary" shape="round">More </Button>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  )
}



export default withRouter(JobCardComponent);
