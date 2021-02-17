import React from 'react';
import { withRouter } from 'next/router';
import { Card, Avatar, Typography, Button } from 'antd';
import moment from 'moment';
import Link from 'next/link';



const { Title, Text } = Typography

const JobCardMobile = (props) => {
  const { item } = props;
  return (
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
        <div className="card-job__container">
          <div className="card-job__header">
            <div className="card-job__header__title" >
              <div className="card-job__header__company">
                <Avatar shape="square" size={60} src={item.company.photo} />
                <p className="card-job__description__title" level={3}> {item.company.tradename} </p>
              </div>
              <Title level={4}> {item.title} </Title>
              <Text>
                {item.company.address}  |  {item.company.address2}
              </Text>
            </div>
          </div>
          <div className="card-job__detail">
            <div>
              <p> {item.description} </p>
              <Text type="secondary" > {moment(item.date, "YYYYMMDD").fromNow()}</Text>
            </div>
            <Button type="primary" shape="round">More </Button>
          </div>
        </div>
      </Link>
    </Card>
  )
}



export default withRouter(JobCardMobile);
