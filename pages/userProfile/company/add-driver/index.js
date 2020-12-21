import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tags, Drawer, Button, notification, Table, Progress } from 'antd';
import SideNav from '../../components/SideNavAdmin';
import { WrapperSection } from 'components/helpers';
import NewDriverForm from './FormNewDriver';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import "./styles.less";
const { Title, Text } = Typography;

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const AddDriverView = ({ user, ...props }) => {
  const [driverList, setDriverList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const header = {
    headers: { Authorization: `Bearer ${user.token}` }
  };

  const fetchDriversList = async () => {
    let data = [
      {
        name: 'Ioce ',
        lastname: 'Velasco',
        email: 'iocevelasco@gmail.com',
        progress: 40,
        status: 'in progress',
        dln: 1112312312
      },
      {
        name: 'Ioce ',
        lastname: 'Velasco',
        email: 'iocevelasco@gmail.com',
        progress: 60,
        status: 'in progress',
        dln: 1112312312
      }
    ]
    setDriverList(data);
    await axios.get(`/api/company/jobs/applys`, header)
      .then((response) => {
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err)
      })
  };

  useEffect(() => {
    fetchDriversList()
  }, [])

  const addNewDriver = async (fields) => {
    const { newDriver } = await beforeToCreateProfile(fields);
    newDriver.job = '5faeb39f2d69cc4484b6db26';
    await axios.post('/api/driver/staff/new', newDriver, header)
      .then((response) => {
        console.log(response);
        setLoader(false);
        notification['success']({
          message: 'Success',
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
        });
      })
      .catch((err) => {
        console.log('[ user registry error ]', err);
        setLoader(false);
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this user, please try again. "
        });
      })
  }

  const beforeToCreateProfile = async (fields) => {
    setLoader(true);
    try {
      const { name, dln, lastname, email } = fields;
      let newDriver = {}
      newDriver.name = name;
      newDriver.lastname = lastname;
      newDriver.email = email;
      newDriver.dln = dln;
      return {
        newDriver,
      }
    } catch (error) {
      console.log(error);
    }
  }

  const stylesWrapper = {
    paddingTop: 24,
    paddingBottom: 24,
    minHeight: '90vh',
    backgroundSize: 'contain',
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
      key: 'email',
    },
    {
      title: 'dln',
      dataIndex: 'dln',
      align: 'center',
      key: 'dln',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
    },
    {
      title: 'Percentage complete',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: () => {
        return <Progress percent={30} />
      }
    },
  ];



  const openDrawer = () => {
    setVisible(true);
  };

  const onCloseDrawer = () => {
    setVisible(false);
  }

  return (
    <>
      <Row>
        <SideNav
          currentLocation='4' />
        <Col span={20}>
          <WrapperSection row={22} styles={stylesWrapper}>
            <Row justify='space-between' align='middle' className='add-new-driver--header'>
              <Col span={8}>
                <Title level={4}> New drivers status </Title>
              </Col>
              <Col span={4}>
                <Button
                  type='primary'
                  shape="round"
                  size="large"
                  onClick={openDrawer}>
                  Create invitation
                </Button>
              </Col>
            </Row>
            <Card>
              <Table
                rowKey='id'
                loading={loader}
                columns={columns}
                dataSource={driverList}
              />
            </Card>
          </WrapperSection>
        </Col>
        <Drawer
          title='Add new driver'
          placement="right"
          closable={true}
          width={680}
          onClose={onCloseDrawer}
          visible={visible}>
          <NewDriverForm
            addNewDriver={addNewDriver}
            loader={loader} />
        </Drawer>
      </Row>
    </>
  )
};


export default withRouter(connect(mapStateToProps)(AddDriverView));