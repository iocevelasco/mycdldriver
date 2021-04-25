import React, { useState } from "react";
import {
  Row,
  Col,
  Rate,
  Divider,
  Drawer,
  Button,
  Modal,
  Select,
  notification,
} from "antd";
import { IdcardOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function DetailsDrawer(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { driverData, setSelectedDriver } = props;
  const {
    _id,
    name,
    lastname,
    rating,
    img,
    profile,
    experience,
    incidents,
  } = driverData;

  const onClose = () => {
    setSelectedDriver({});
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Drawer
      width={460}
      placement="right"
      closable
      onClose={onClose}
      visible={driverData._id ? true : false}
      className="details-drawer"
      footer={<FooterDrawer setSelectedDriver={setSelectedDriver} />}
    >
      {driverData._id && (
        <>
          <Row className="space-rows" align="middle" justify="center">
            <Col>
              <img className="profile-img" src={img} />
            </Col>
          </Row>
          <Row className="space-rows" align="center" justify="space-between">
            <h2 className="fullname">{`${name} ${lastname}`}</h2>
            <div>
              <Rate className="rating" disabled value={1} count={1} />{" "}
              <span>{rating}</span>
            </div>
          </Row>
          <Divider />
          <Row className="space-rows">
            {Object.keys(profile).map((field) => {
              return (
                <Col key={field} className="details-column" span={24}>
                  <label>{field}: </label>
                  <span>{profile[field]}</span>
                </Col>
              );
            })}
          </Row>
          <Divider />
          <Row className="space-rows">
            <h3>Experience</h3>
            {Object.keys(experience).map((field) => {
              const hasContent = () => {
                return profile[field] ? profile[field] : "Doesn't have";
              };
              return (
                <Col key={field} className="details-column" span={24}>
                  <label>{field}: </label>
                  <span>{hasContent()}</span>
                </Col>
              );
            })}
            <Col span={24}>
              <Modal
                visible={modalVisible}
                closable
                onCancel={handleModal}
                footer={null}
                width={400}
              >
                <div style={{ textAlign: "center" }}>
                  <img
                    width={360}
                    src="https://www.dmv.pa.gov/ONLINE-SERVICES/SiteAssets/Pages/Where-Find-DL/DL%20w%20ARROW.jpg"
                  />
                </div>
              </Modal>
              <Row gutter={[16]}>
                <Col span={12} className="buttons-experience">
                  <Button
                    onClick={handleModal}
                    size="large"
                    icon={<IdcardOutlined />}
                  >
                    DLN Number
                  </Button>
                </Col>
                <Col span={12} className="buttons-experience">
                  <Button
                    onClick={handleModal}
                    size="large"
                    icon={<IdcardOutlined />}
                  >
                    Medic Card
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider />
          <Row className="space-rows">
            <h3>Incidents</h3>
            {incidents.length ? (
              incidents.map((incident, i) => {
                return (
                  <Col key={i} className="details-column" span={24}>
                    <span>{incident}</span>
                  </Col>
                );
              })
            ) : (
              <Col className="details-column" span={24}>
                <span>Driver has no incidents to date</span>
              </Col>
            )}
          </Row>
        </>
      )}
    </Drawer>
  );
}

const FooterDrawer = (props) => {
  const { setSelectedDriver } = props;
  const [job, setJob] = useState(null);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setJob(value);
  };

  const handleClick = () => {
    console.log(`job sent ${job}`);
    setJob(null);
    setSelectedDriver({});
    return notification.success({
      message: "Success",
      description: "It's done! The invitation has been sent succesfully",
    });
  };

  return (
    <div className="footer-drawer">
      <Select
        style={{ width: "220px" }}
        onChange={handleChange}
        placeholder={"Select a job to apply"}
      >
        <Option value="job 1">Job 1</Option>
        <Option value="job 2">Job 2</Option>
        <Option value="job 3">Job 3</Option>
      </Select>
      {console.log(job)}
      <Button onClick={handleClick} type="primary" disabled={!job}>
        Send Invitation
      </Button>
    </div>
  );
};
