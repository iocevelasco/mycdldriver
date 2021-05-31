import React from "react";
import { withRouter } from "next/router";
import { Card, Avatar, Typography, Button } from "antd";
import moment from "moment";
import Link from "next/link";

const { Title, Text } = Typography;

const JobCardDesktop = (props) => {
  const { item } = props;
  return (
    <Card
      hoverable
      className="card-job__box"
      cover={
        <>
          <div className="card-job__header__company">
            <Avatar shape="square" size={120} src={item.company.photo} />
            <p className="card-job__description__title" level={3}>
              {" "}
              {item.company.tradename}{" "}
            </p>
          </div>
          <img alt="logo" src={item.logo} />
        </>
      }
    >
      <Link
        href={{
          pathname: "/job-offert",
          query: { id: item._id },
        }}
      >
        <div className="card-job__container">
          <div className="card-job__header">
            <div className="card-job__header__title">
              <Title level={4}> {item.title} </Title>
              <div className="card-job__header__sub-title">
                <Text>
                  {item.company.address} | {item.company.address2}
                </Text>
                <Text type="secondary">
                  {" "}
                  {moment(item.date, "YYYYMMDD").fromNow()}
                </Text>
              </div>
            </div>
          </div>
          <div className="card-job__detail">
            <div>
              <p> {item.description} </p>
            </div>
            {props.type !== "small" ? (
              <Button type="primary" shape="round" style={{ width: "140px" }}>
                Apply now
              </Button>
            ) : (
              <Button type="primary" shape="round" style={{ width: "140px" }}>
                View more
              </Button>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default withRouter(JobCardDesktop);
