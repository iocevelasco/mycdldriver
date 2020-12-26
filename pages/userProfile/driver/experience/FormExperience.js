import React, { useState } from "react";
import { Row, Col, Input, Form, Button, InputNumber, Switch, DatePicker, } from "antd";
import { SpinnerComp } from "components/helpers";
import mockExperience from "./experience.json";
import { DraggerUpload } from "components/UploadImages";
const { TextArea } = Input;

const FormExperience = (props) => {
  const [switchValues, setSwitchValues] = useState(mockExperience);
  const [twicCard, setTwicCard] = useState({ twicCard: false });
  const [swtichInputs, setSwitchInputs] = useState([
    "Tamk endorsed",
    "Hazmat",
    "Referred loads",
    "Van",
    "Car Carrier",
    "Flat Bed",
  ]);

  const [form] = Form.useForm();

  const isUserRegistry = async (fields) => {
    let body = {
      dln: fields.dln,
      description: fields.description,
      expDateDln: fields.expDateDln._d,
      twicCard: twicCard,
    };

    body.experience = { ...switchValues };
    props.onSubmitExperience(body);
  };

  const switchChange = async (value, name, type) => {
    switch (type) {
      case "years":
        let years = { years: value };
        setSwitchValues({
          ...switchValues,
          [name]: { ...switchValues[name], ...years },
        });
        break;
      case "have":
        let have = { have: value };
        setSwitchValues({
          ...switchValues,
          [name]: { ...switchValues[name], ...have },
        });
        break;
    }
  };

  return (
    <div className="driver-experience">
      <Row justify="center">
        <Col className="driver-experience--form" span={24}>
          <Form
            fields={props.fields}
            form={form}
            onFinish={isUserRegistry}
            name="global_state"
            layout="vertical"
            onFieldsChange={props.onChangeProps}
          >
            <Row gutter={[42]} >
              <Col span={10}>
                <Row gutter={[12]} justify="space-between" align="middle">
                  <Col span={24}>
                    <Form.Item
                      label="Dln"
                      name="dln"
                      rules={[
                        {
                          required: true,
                          message: "dln is required!",
                        },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={900000000000000}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Dln expiration"
                      name="expDateDln"
                      rules={[
                        {
                          required: true,
                          message: "Dln expiration date is required!",
                        },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <DraggerUpload
                      label='DLN'
                      button='Add photo'
                      setImage={props.setImageDLN}
                      image={props.imageDln}
                      token={props.token} />
                  </Col>
                  <Col span={24}>
                    <DraggerUpload
                      setImage={props.setMedicCard}
                      image={props.medicCard}
                      label='Medic card'
                      button='Add photo'
                      token={props.token} />
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Description"
                      name="description"
                    >
                      <TextArea
                        rows={4}
                        placeholder="Tell us something about your background"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col className="driver-experience--form-switch" span={14}>
                <Row gutter={24} className="selectTitle">
                  {" "}
                  <h4>What kind of experience you have?</h4>
                </Row>
                <Row gutter={[24]} justify="space-between">
                  <Col
                    span={24}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Form.Item
                      className="formSwitch"
                      label={"Twic Card"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Switch
                        onChange={(checked) => setTwicCard(checked)}
                        name={"twicCard"}
                        checkedChildren={"ON"}
                        unCheckedChildren={"OFF"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    {swtichInputs.length >= 1 &&
                      swtichInputs.map((inp, index) => {
                        return (
                          <Form.Item
                            className="formSwitch"
                            label={inp}
                            key={index}
                            rules={[
                              {
                                required: false,
                              },
                            ]}
                          >
                            <Switch
                              onChange={(checked) =>
                                switchChange(checked, inp, "have")
                              }
                              name={inp.name}
                              checkedChildren={"ON"}
                              unCheckedChildren={"OFF"}
                            />
                          </Form.Item>
                        );
                      })}
                  </Col>

                  <Col span={12}>
                    {Object.keys(switchValues).map((inp, index) => {
                      return (
                        <Form.Item
                          name={switchValues[inp].name}
                          className="formNumber"
                          key={index}
                          style={{
                            visibility: !switchValues[inp]["have"]
                              ? "collapse"
                              : "visible",
                          }}
                          label="Years of experience"
                          rules={[
                            {
                              required: false,
                            },
                          ]}
                        >
                          <InputNumber
                            onChange={(value) =>
                              switchChange(value, switchValues[inp].name, "years")
                            }
                            min={0}
                            max={100}
                          />
                        </Form.Item>
                      );
                    })}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={[24]} justify="center" align="middle">
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  block
                  size="large"
                >Complete experience
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

      </Row>
      <SpinnerComp active={props.loading ? props.loading : false} />
    </div>
  );
};

export default FormExperience;
