import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { Typography, Row, Col, Button } from 'antd';
const { Title, Text } = Typography;
import "./styles.less";

const TitleSectionComponent = ({ title, actions, isAction }) => {
  return (
    <Row justify='space-between' align='middle' className='add-new-driver--header'>
      <Col span={20}>
        <Title level={4}> {title} </Title>
      </Col>
      {
        isAction && <Col span={4}><center>
          <Button
            onClick={actions.action}
            type='primary'
            size="large">
            {actions.textAction}
          </Button></center>
        </Col>
      }
    </Row>
  )
}

export default TitleSectionComponent; 