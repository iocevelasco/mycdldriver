import React, { useEffect, useState, useReducer } from 'react';
import { Row, Col, Typography, message, Drawer, Button, notification, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import axios from 'axios';
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import ServicesList from './components/ServicesList';
import ServicesForm from './components/ServicesForm';
import useMobileDetect from 'use-mobile-detect-hook';
import "./styles.less";
const { Text, Title } = Typography;

// CONNECT WITH REDUX
function mapStateToProps(state) {
  const { user } = state;
  return {
    companyId: user.company._id,
    token: user.token
  }
}

const CompanyJobView = (props) => {
  const { companyId, token } = props;

  const [contactList, setContactList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [imageThumbnails, setImage] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const detectMobile = useMobileDetect();
  const header = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchServiceList = async () => {
    setIsFetching(true);
    await axios
      .get('/api/services', header)
      .then((response) => {
        let options = response.data.data;
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchServiceList();
  }, []);


  const handleOnChangeImage = ({ file }) => {
    setImage(file.response);
  };

  const createSuccess = () => {
    fetchServiceList();
    notification['success']({
      message: 'Success',
      description:
        "Success ! Your position has been created"
    });
  }

  const createService = async (fields) => {
    console.log('[FORM BEFORE]', fields);
    /*const data = beforeToCreate(fields);
    console.log('[FORM AFTER]', data);*/
    await axios.post('/api/services', fields, header)
      .then(() => createSuccess())
      .catch((err) => {
        console.log(err);
        fetchServiceList();
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this position, please try again. "
        });
      })
  };

  const beforeToCreate = (fields) => {
    const { title, detail, email, whatsapp, state, city } = fields;
    const newService = {
      title: title,
      detail: detail,
      email: email,
      company: companyId,
      whatsapp: whatsapp,
      image: imageThumbnails,
      phone: phone,
      includeService: includeService,
      state: state,
      city: city
    }

    return newService;
  }

  return (
    <WrapperDashboard section={2}>
      <Row>
        <Col span={24} className="profile-company__services">
          <WrapperSection row={24}>
            <Row justify='space-between' align='middle' className='profile-company__services__header'>
              <Col xs={22} xl={8}>
                <Title level={3}> Create and edit your position </Title>
                <Text> Fill the form and publish a job search, wich will we seen by our drivers</Text>
              </Col>
              <Col xs={22} xl={4}>
                <Button
                  type='primary'
                  shape="round"
                  size="large"
                  block
                  onClick={() => setVisibleAdd(true)}>
                  Add new services
                </Button>
              </Col>
            </Row>
          </WrapperSection>
        </Col>
      </Row>
      <Drawer
        title='Create Job'
        placement="right"
        closable={true}
        width={detectMobile.isMobile() ? 400 : 780}
        onClose={() => setVisibleAdd(false)}
        visible={visibleAdd}>
        {
          visibleAdd && <ServicesForm
            handleOnChangeImage={handleOnChangeImage}
            formType='create'
            setImage={setImage}
            createService={createService}
            setServiceList={setServiceList}
            setContactList={setContactList}
          />
        }
      </Drawer>
    </WrapperDashboard>
  )
}

export default withRouter(
  connect(mapStateToProps)(CompanyJobView)
);