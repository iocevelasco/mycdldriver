import React from 'react';
import { Typography, Modal, Row, Col } from 'antd';
import propTypes, { arrayOf, node } from 'prop-types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ServicesCard from 'components/CardServices';
import axios from 'axios';
const { confirm } = Modal;

const { Text, Title } = Typography

const ServicesList = (props) => {
  const { serviceList, setEditService, deleteService } = props;
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
  console.log('serviceList', serviceList);

  return (
    <Row gutter={[24, 24]}>
      {
        serviceList.map((service, key) => (
          <Col span={8}>
            <ServicesCard
              edit={true}
              type='ABM'
              image={service.image}
              city={service.city}
              email={service.email}
              title={service.title}
              whatsapp={service.whatsapp}
              _id={service._id}
              detail={service.detail}
              state={service.state}
              actions={{
                edit: () => setEditService(service),
                delete: () => showConfirm(service._id)
              }}
            />
          </Col>
        ))
      }
    </Row>
  )
}

export default ServicesList;

