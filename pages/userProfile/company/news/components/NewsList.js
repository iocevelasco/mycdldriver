import React from 'react'
import { Row, Col, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CardNews from '../../../../components/Cards/News';


const NewsList = (props) => {

  return (
    <Row gutter={[24, 24]}>
        <Col span={24}>
          <CardNews/>
        </Col>
    </Row>
  )
}

export default NewsList;
