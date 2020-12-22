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
    user: user,
    photo: user.photo || "",
    facebook_id: user.facebook_id || "",
    google_id: user.google_id || "",
    _id: user._id || null,
    token: user.token || null,
    driver: user.driver || {},
    isUserRegistry: state.user.typeUser || null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewDriverProps: (newProps) => dispatch(updateUserDrive(newProps)),
    addExperience: (experience) => dispatch(addExperience(experience)),
  };
}

const DriverExperience = (props) => {
  const [fields, setFields] = useState([]);
  const [imageDln, setImage] = useState([]);
  const stylesWrapper = {
    background: `url('/static/images/bg-routes.jpg')`,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundSize: "contain",
  };
  const header = {
    headers: { Authorization: `Bearer ${props.token}` },
  };
  console.log(header, "esto es header ");

  const propsUpload = {
    name: "logo",
    action: "/api/files",
    headers: {
      authorization: "authorization-text",
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (imageDln.length > 0) {
        try {
          const file = {
            foto: imageDln[0].response.data.file,
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setImage(fileList);
    },
  };

  const onSubmitExperience = async (body) => {
    try {
      body.imageDln = imageDln[0].response.data.file;
      const response = await axios.patch(
        "/api/driver/experience",
        body,
        header
      );
      addExperience(body);

      notification["success"]({
        message: "Success",
        description:
          "it's done!. You can now start browsing our page. If you need to edit you profile you can do it here!",
      });
    } catch (err) {
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
            propsUpload={propsUpload}
            loading={false}
            onSubmitExperience={onSubmitExperience}
          />
        </WrapperSection>
      </Col>
    </Row>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DriverExperience)
);
