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
    userId: user._id,
    token: user.token
  }
}

const CompanyJobView = (props) => {
  const { companyId, token, userId } = props;

  const [contactList, setContactList] = useState([{ number: '' }]);
  const [includeServices, setIncludeServices] = useState([{ description: '' }]);
  const [serviceList, setServiceList] = useState([]);
  const [typeForm, setTypeForm] = useState('create');
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [imageThumbnails, setImage] = useState([]);
  const [fields, setFields] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const detectMobile = useMobileDetect();
  const header = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchServiceList = async () => {
    setIsFetching(true);
    await axios
      .get(`/api/services/${userId}`, header)
      .then((response) => {
        setServiceList(response.data.data)
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
    setVisibleAdd(false);
    setIncludeServices([{ description: '' }]);
    notification['success']({
      message: 'Success',
      description:
        "Success ! Your position has been created"
    });
  }

  const setEditService = (service) => {
    setVisibleAdd(true);
    let fields = [];
    for (let key in service) {
      let inputs = {
        name: [key],
        value: service[key]
      }
      fields.push(inputs);
    }
    setFields(fields);

    let include = service.includeService.map((k) => {
      return { description: k.description }
    });
    setIncludeServices(include);
    setTypeForm('edit');
  }

  const setNewServide = () => {
    setVisibleAdd(true);
  }

  const createService = async (fields) => {
    const data = beforeToCreate(fields);
    await axios.post('/api/services', data, header)
      .then(() => createSuccess())
      .catch((err) => {
        console.log(err);
        fetchServiceList();
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this service, please try again. "
        });
      })
  };

  const editService = async (id, fields) => {
    const data = beforeToCreate(fields);
    data.id = id;
    console.log(data);
    await axios.patch('/api/services', data, header)
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

  const deleteService = async (id) => {
    await axios.delete('/api/services/' + id, header)
      .then(() => createSuccess())
      .catch((err) => {
        console.log(err);
        fetchServiceList();
        notification['error']({
          message: 'error',
          description:
            "Sorry! We couldn't create this service, please try again. "
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
      phone: [],
      includeService: includeServices,
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
                  onClick={() => setNewServide()}>
                  Add new services
                </Button>
              </Col>
            </Row>
          </WrapperSection>
          <WrapperSection row={24}>
            <div className="services-list__container">
              <ServicesList
                serviceList={serviceList}
                deleteService={deleteService}
                setEditService={setEditService} />
            </div>
          </WrapperSection>
        </Col>
      </Row>
      <Drawer
        title={typeForm === 'create' ? 'Create Job' : 'Edit Job'}
        placement="right"
        closable={true}
        width={detectMobile.isMobile() ? 400 : 580}
        onClose={() => setVisibleAdd(false)}
        visible={visibleAdd}>
        {
          visibleAdd && <ServicesForm
            handleOnChangeImage={handleOnChangeImage}
            fields={fields}
            formType={typeForm}
            setImage={setImage}
            createService={createService}
            editService={editService}
            includeServices={includeServices}
            setIncludeServices={setIncludeServices}
          />
        }
      </Drawer>
    </WrapperDashboard>
  )
}

export default withRouter(
  connect(mapStateToProps)(CompanyJobView)
);