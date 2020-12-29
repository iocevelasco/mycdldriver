import React, { useState, useEffect } from "react";
import { Row, Col, notification, message } from "antd";
import FormExperience from "./FormExperience";
import SideNav from "../../components/SideNavAdmin";
import { WrapperSection } from "components/helpers";
import { connect } from "react-redux";
import moment from 'moment';
import axios from "axios";
import { withRouter } from "next/router";
import { addExperience } from "../../../../store/reducers/user_reducer";
import "./styles.less";

function mapStateToProps(state) {
  const { user } = state;
  return {
    token: user.token || null,
    header: state.user.header,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
    addExperience: (experience) => dispatch(addExperience(experience)),
  };
}

const DriverExperience = ({ header, token, user, ...props }) => {
  const [fields, setFields] = useState([]);
  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundSize: "contain",
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

    for (let key in user.driver) {
      if (key === 'expDateDln') {
        let inputs = {
          name: [key],
          value: moment(user.driver[key])
        }
        fields.push(inputs);
      } else {
        let inputs = {
          name: [key],
          value: user.driver[key]
        }
        fields.push(inputs);
      }
    }
    setFields(fields);
  }, []);

  function setFormatExperience(exp) {
    const oldFormat = exp.experience;
    let newFormat = [];

    Object.keys(oldFormat).map((inp, index) => {
      newFormat.push({
        name: oldFormat[inp].name,
        have: oldFormat[inp].have,
        years: oldFormat[inp].years
      });
    });
    exp.twicCard = exp.twicCard.twicCard;
    exp.experience = newFormat;
    return exp;
  }


  const onSubmitExperience = async (body) => {
    try {
      const formatExp = setFormatExperience(body);
      const response = await axios.patch("/api/driver/experience", formatExp, { headers: { Authorization: `Bearer ${token}` } });

      addExperience(formatExp);

      notification["success"]({
        message: "Success",
        description:
          "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!",
      });
    } catch (err) {
      console.log('err', err)
      notification["error"]({
        message: "error",
        description: "Sorry! We couldn't create this user, please try again. ",
      });
    }
  };

  return (
    <Row display="flex" justify="center">
      <SideNav currentLocation="2" />
      <Col span={20}>
        <WrapperSection styles={stylesWrapper} row={22} mt={0}>
          <FormExperience
            fields={fields}
            loading={false}
            onSubmitExperience={onSubmitExperience}
            token={token}
          />
        </WrapperSection>
      </Col>
    </Row>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverExperience)
);
