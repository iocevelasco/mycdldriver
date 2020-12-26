import React, { useState, useEffect } from "react";
import MainLayout from "components/layout";
import { Row, Col, notification, message } from "antd";
import FormExperience from "./FormExperience";
import SideNav from "../../components/SideNavAdmin";
import { WrapperSection } from "components/helpers";
import { connect } from "react-redux";
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
  const [imageDln, setImageDLN] = useState([]);
  const [medicCard, setMedicCard] = useState([]);
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
    console.log('user', user);
    console.log('user', user.driver);
    for (let key in user.driver) {
      let inputs = {
        name: [key],
        value: user.driver[key]
      }
      fields.push(inputs);
    }
    setFields(fields);
  }, []);

  console.log('imageDln', imageDln)
  console.log('medicCard', medicCard)

  const onSubmitExperience = async (body) => {
    try {
      if (imageDln.data) {
        body.imageDln = imageDln.data.file;
      }
      if (medicCard.data) {
        body.medicCard = medicCard.data.file;
      }

      const response = await axios.patch("/api/driver/experience", body, header);
      console.log('response', response);
      addExperience(body);

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
            imageDln={imageDln}
            setImageDLN={setImageDLN}

            medicCard={medicCard}
            setMedicCard={setMedicCard}
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
