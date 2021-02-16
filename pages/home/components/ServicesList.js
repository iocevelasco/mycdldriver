import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Card, Image, Button } from 'antd';
import propTypes, { arrayOf, node } from 'prop-types';
import { fetchServices } from '@store/reducers/landing_reducer';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';

const { Text, Title } = Typography

function mapStateToProps(state) {
  return {
    jobs: state.landing.jobs,
    servicesArray: state.landing.services
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchServices: () => dispatch(fetchServices())
  }
}

const ServicesList = (props) => {
  const { servicesArray } = props;

  useEffect(() => {
    props.fetchServices();
  }, [])

  const ItemProps = ({ text, icon, customClass }) => (
    <div className={`services-card__item`}>
      {icon}
      <span>{text}</span>
    </div>
  );

  const styles = {
    body: {
      padding: 0
    }
  }

  return (
    <div className="services-list__container">
      {
        servicesArray.map((service, key) => {
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
                    <Button type="link" icon={<EditOutlined />} />
                    <Button type="link" icon={<DeleteOutlined />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ServicesList);
