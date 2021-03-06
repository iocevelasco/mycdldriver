import React, { useState, useEffect } from "react";
import { Row, Col, notification, message } from "antd";
import FormExperience from "./FormExperience";
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { withRouter } from "next/router";
import { addExperience, fetchUserData } from "@store/reducers/user_reducer";
import "./styles.less";

function mapStateToProps(state) {
  const { user } = state;
  return {
    token: user.token || null,
    header: state.user.header,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
    addExperience: (experience) => dispatch(addExperience(experience)),
    fetchUserData: (token, typeUser) =>
      dispatch(fetchUserData(token, typeUser)),
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
        value: user[key],
      };
      fields.push(inputs);
    }

    for (let key in user.driver) {
      if (key === "expDateDln") {
        let inputs = {
          name: [key],
          value: moment(user.driver[key]),
        };
        fields.push(inputs);
      } else {
        let inputs = {
          name: [key],
          value: user.driver[key],
        };
        fields.push(inputs);
      }
    }
    setFields(fields);
  }, []);

  const onSubmitExperience = async (body) => {
    await axios
      .patch("/api/driver/experience", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        props.fetchUserData(token, user.typeUser);
        notification["success"]({
          message: "Success",
          description:
            "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!",
        });
      })
      .catch((err) => {
        console.log("err", err);
        notification["error"]({
          message: "error",
          description:
            "Sorry! We couldn't create this user, please try again. ",
        });
      });
  };

  return (
    <WrapperDashboard section={2}>
      <Row display="flex" justify="center">
        <Col span={24} className="profile-company__jobs">
          <WrapperSection styles={stylesWrapper} row={22} mt={0}>
            <FormExperience
              fields={fields}
              loading={false}
              onSubmitExperience={onSubmitExperience}
              token={token}
              user={user}
            />
          </WrapperSection>
        </Col>
      </Row>
    </WrapperDashboard>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverExperience)
);
