import React from 'react';
import { useState } from 'react';
import { Typography, Card, Image, Button, Modal } from 'antd';
import propTypes, { arrayOf, node } from 'prop-types';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, UserOutlined, MailOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
const { confirm } = Modal;

const { Text, Title } = Typography

const ServicesList = (props) => {
  const { serviceList, setEditService, deleteService } = props;

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

  function showConfirm(id) {
    confirm({
      title: 'Do you Want to delete these service?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action can not be undone',
      onOk() {
        deleteService(id);
      },
      onCancel() {
      },
    });
  }

  return (
    <div className="services-list__container">
      {
        serviceList.map((service, key) => {
          const { includeService, image, email, detail, city, state, whatsapp, title } = service;
          return <Card key={key} hoverable={true} bodyStyle={styles.body}>
            <div className="services-card__body">
              <div className="services-card__left">
                <div className="services-card__thumbnails">
                  <Image height={200} src={image} />
                </div>
                <div className="services-card__contact-list">
                  <ItemProps
                    className={null}
                    icon={<PhoneOutlined style={{ color: "#E73540" }} />}
                    text={`Phone: ${whatsapp}`}
                  />
                  <ItemProps
                    className={null}
                    icon={<MailOutlined style={{ color: "#E73540" }} />}
                    text={`Email: ${email} `}
                  />
                </div>
              </div>
              <div className="services-card__right">
                <div className="services-card__title">
                  <Title level={3} >{title} </Title>
                  <Text>{detail}</Text>
                </div>
                <h4 className="services-card__service-include-title">Include </h4>

                <div className="services-card__service-include">
                  {
                    includeService.map((include) => {
                      if (include.description) {
                        return (
                          <ItemProps
                            className={null}
                            icon={<CheckCircleOutlined style={{ color: "#E73540" }} />}
                            text={include.description}
                          />
                        )
                      }
                    })
                  }
                </div>
                <div className="services-card__footer">
                  <div className="services-card__footer--address">
                    <p> {state.stateName}  </p>
                    <p> {city.cityName}  </p>
                  </div>
                  <div className="services-card__footer--actions">
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => setEditService(service)} />
                    <Button type="link" icon={<DeleteOutlined />} onClick={() => showConfirm(service._id)} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        })
      }

    </div>
  )
}

export default ServicesList;