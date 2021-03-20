import React from 'react';
import { withRouter } from 'next/router';
import { Col, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { ImageProfile } from 'components/UploadImages';

function mapStateToProps(state) {
  const { user } = state;
  return {
    token: user.token
  }
}

const Header = (props) => {
  return (
    <>
      <Col className="header__col" span={14}>
        <div className="header__container">
          <h1 className="header__title">Add new driver</h1>
          <p className="header__text">
            In this module you can add new drivers
          </p>
          <Button icon={<ArrowLeftOutlined />} type='link' onClick={() => props.router.push('/userProfile/company/staff')}>
            Go back
          </Button>
        </div>
      </Col>
      <Col span={10}>
        <div className="create-user__avatar-container">
          <ImageProfile
            shape="square"
            size={125}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#562ce6' }}
            setNewImage={props.setNewImage}
            newImage={props.newImage}
            token={props.token}
          />
        </div>
      </Col>
    </>
  );
}

export default withRouter(
  connect(mapStateToProps)(Header)
);
