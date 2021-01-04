import React, { useEffect, useState } from 'react';
import { Row, Col, notification, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import FormUserCompany from './FormUserCompany';
import SideNav from '../../components/SideNavAdmin';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateUserCompany } from '@store/reducers/user_reducer';
import { WrapperSection } from 'components/helpers';

function mapStateToProps(state) {
  const { user } = state;
  return {
    user: user,
    _id: user._id || null,
    token: user.token || null,
    company: user.company || {},
    isUserRegistry: user.typeUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlreNewUserProps: (newProps) => dispatch(updateUserCompany(newProps)),
  }
};

const CompanyProfileView = ({ user, ...props }) => {
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoader] = useState(false);
  const [visibleModalPassword, setVisiblePassword] = useState(false);
  const [fields, setFields] = useState([]);
  const [configPsw, setPsw] = useState({
    password: null,
    isPassword: false
  });


  const header = {
    headers: { Authorization: `Bearer ${props.token}` }
  };

  useEffect(() => {
    let fields = [];

    for (let key in user) {
      let inputs = {
        name: [key],
        value: user[key]
      }
      fields.push(inputs);
    }

    for (let key in user.company) {
      let inputs = {
        name: [key],
        value: user.company[key]
      }
      fields.push(inputs);
    }
    setFields(fields);
  }, []);

  const beforeToCreateProfile = async (fields, type) => {
    try {
      const { google_id, facebook_id, photo } = user;
      const { phoneNumber, lastname, email, name, tradename, legalNumber, address, address2, areaCode, zipCode, state, city } = fields;

      let base = {}
      let company = {}

      if (type === 'update') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 2;
        base.photo = newImage ? newImage : photo;

      }
      if (type === 'create') {
        base.name = name;
        base.lastname = lastname;
        base.typeUser = 2;
        base.photo = newImage ? newImage : photo;
        base.email = email;
        base.google_id = google_id;
        base.facebook_id = facebook_id;
      }

      company.password = configPsw.password;
      company.tradename = tradename;
      company.legalNumber = legalNumber;
      company.phoneNumber = phoneNumber;
      company.city = city;
      company.state = state;
      company.areaCode = areaCode;
      company.address2 = address2;
      company.address = address;
      company.zipCode = zipCode;

      return {
        company,
        base
      }
    } catch (error) {
      console.log(error);
    }
  }

  const newCompany = async (fields) => {
    passwordValidator();
    if (props.isUserRegistry == 0 && configPsw.isPassword == false) return;
    const { base, company } = await beforeToCreateProfile(fields, 'create');
    const fullCompany = { base: base, ...company };
    setLoader(true);
    try {
      const { data } = await axios.post('/api/company', fullCompany);
      setLoader(false);
      let create = {
        user: data.data.user,
        company: data.data.company
      };
      props.handlreNewUserProps(create);
      notification['success']({
        message: 'Success',
        description:
          "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
      notification['error']({
        message: 'error',
        description:
          "Sorry! An error occurred while saving changes! Please try again."
      });
    }
  };

  const updateCompany = async (fields) => {
    const { base, company } = await beforeToCreateProfile(fields, 'update');
    const fullCompany = { base: base, ...company };
    setLoader(true);
    try {
      await axios.patch('/api/company/' + props._id, fullCompany, header)
        .then((response) => {
          let update = {
            user: response.data.data.user,
            company: response.data.data.company
          };
          props.handlreNewUserProps(update);
          setLoader(false);
          notification['success']({
            message: 'Success',
            description:
              "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!"
          });
        });
    } catch (err) {
      console.log(err);
      setLoader(false);
      notification['error']({
        message: 'error',
        description:
          "Sorry! An error occurred while saving changes! Please try again."
      });
    }
  };

  const styleWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundSize: 'contain',
  }

  const closeWindow = () => {
    if (typeof window !== "undefined") {
      const params = window.location.search;
      if (window.opener) {
        window.opener.postMessage(params);
        window.opener.location.reload();
        window.close();
      }
    }
  }

  const passwordValidator = () => {
    if (props.isUserRegistry == 0 && configPsw.isPassword == false) {
      notification['error']({
        message: 'Error',
        description:
          'Please config your password'
      });
      return
    }
  }


  return (
    <>
      <Row display='flex' justify='center'>
        {closeWindow()}
        <SideNav currentLocation='0' />
        <Col span={20}>
          <WrapperSection row={24} styles={styleWrapper}>
            <FormUserCompany
              newImage={newImage}
              setNewImage={setNewImage}
              newCompany={newCompany}
              visibleModalPassword={visibleModalPassword}
              setVisiblePassword={setVisiblePassword}
              updateCompany={updateCompany}
              loading={loading}
              setPsw={setPsw}
              fields={fields}
              configPsw={configPsw}
            />
          </WrapperSection>
        </Col>
      </Row>
    </>
  )
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CompanyProfileView)
);


