import React from 'react';
import { Col, Row, Typography, Card, Image } from 'antd';
import axios from 'axios';
import propTypes, { arrayOf, node } from 'prop-types';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Text, Title } = Typography

const ServicesList = (props) => {

  const ItemProps = ({ text, icon, customClass }) => (
    <div className={`services-card__item`}>
      {icon}
      <span>{text}</span>
    </div>
  );
  let image = 'https://mycdl-driver-test.s3.us-west-2.amazonaws.com/fqVysKZbmdL1DB_HIaJK0jNnFZY4UpkhgTwKt9wpExTaR_rYIWrTWqQTmbpDDD5k.jpg';
  const styles = {
    body: {
      padding: 0
    }
  }
  return (
    <div className="services-list__container">
      <Card hoverable={true} bodyStyle={styles.body}>
        <div className="services-card__body">
          <div className="services-card__left">
            <div className="services-card__thumbnails">
              <Image height={200} src={image} />
            </div>
            <div className="services-card__contact-list">
              <ItemProps
                className={null}
                icon={<UserOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <ItemProps
                className={null}
                icon={<PhoneOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <ItemProps
                className={null}
                icon={<MailOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
            </div>
          </div>
          <div className="services-card__right">
            <div className="services-card__title">
              <Title level={3} >Name of the service </Title>
              <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.</Text>
            </div>
            <div className="services-card__service-include">
              <ItemProps
                className={null}
                icon={<CheckCircleOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <ItemProps
                className={null}
                icon={<CheckCircleOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <ItemProps
                className={null}
                icon={<CheckCircleOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <ItemProps
                className={null}
                icon={<CheckCircleOutlined style={{ color: "#E73540" }} />}
                text={`Contact`}
              />
              <div className="services-card__footer">

              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ServicesList;