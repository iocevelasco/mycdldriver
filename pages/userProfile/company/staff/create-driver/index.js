import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Typography, Row, Col, Card, Tabs, Divider } from 'antd';
import { WrapperSection, WrapperDashboard, BuildSection } from 'components/helpers';
import {
  UserOutlined,
  CarOutlined,
  BarcodeOutlined,
  HomeOutlined,
  SelectOutlined,
} from '@ant-design/icons';
import FormComponent from './form';
import axios from 'axios';
const { Title, Text } = Typography;
const { TabPane } = Tabs;

import './styles.less';
import Header from './header';

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const AdminView = (props) => {
  const [list, setList] = useState([]);
  const [newImage, setNewImage] = useState(null);
  return (
    <WrapperDashboard>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card bodyStyle={{ backgroundColor: '#ffffff', border: 0 }}>
              <div className="create-user__container">
                <div>
                  <Row>
                    <Header setNewImage={setNewImage} newImage={newImage} />
                    <Divider className="dividers" />
                    <FormComponent token={props.user.token} userId={props.user._id} />
                  </Row>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </WrapperDashboard>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminView)
);
