import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Avatar,
  Form,
  Button,
  Upload,
  InputNumber,
  Radio,
  Switch,
  DatePicker,
  notification,
  message,
} from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  UploadOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { updateUserDrive } from "@store/reducers/user_reducer";
import { SpinnerComp } from "components/helpers";
import { beforeUpload, propsUpload } from "@utils/form";
import mockExperience from "./experience.json";
const { TextArea } = Input;

const FormExperience = (props) => {
  const [switchValues, setSwitchValues] = useState(mockExperience);
  const [swtichInputs, setSwitchInputs] = useState([
    "Tamk endorsed",
    "Hazmat",
    "Referred loads",
    "Van",
    "Car Carrier",
    "Flat Bed",
  ]);

  const [form] = Form.useForm();

  useEffect(() => {}, [switchValues]);

  const isUserRegistry = async (fields) => {};

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
            <Row gutter={[24]} justify="space-between" align="middle">
              <Col span={12}>
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
              <Col span={12}>
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
            </Row>

            <Col className="profile-driver__form-small" span={24}>
              <Row gutter={[24]} justify="space-between">
                <Col span={12}>
                  {swtichInputs.length >= 1 &&
                    swtichInputs.map((inp) => {
                      return (
                        <Form.Item
                          className="formSwitch"
                          label={inp}
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
                            size="small"
                            checkedChildren={"ON"}
                            unCheckedChildren={"OFF"}
                          />
                        </Form.Item>
                      );
                    })}
                </Col>

                <Col span={12}>
                  {Object.keys(switchValues).map((inp) => {
                    return (
                      <Form.Item
                        name={switchValues[inp].name}
                        className="formNumber"
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
                <Form.Item>
                  <Upload
                    {...props.propsUpload}
                    fileList={props.imageDln}
                    beforeUpload={beforeUpload}
                  >
                    <Button icon={<UploadOutlined />}>
                      Add your DLN picture
                    </Button>
                  </Upload>
                </Form.Item>
              </Row>
              <Form.Item label="Description" name="description">
                <TextArea
                  rows={4}
                  placeholder="Tell us something about your background"
                />
              </Form.Item>
            </Col>
            <Row gutter={[24]} justify="center" align="middle">
              <Col span={12}>
                <Button
                  style={{ marginTop: 24 }}
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  block
                  size="large"
                >
                  {props.isUserRegistry
                    ? "Save changes"
                    : "Complete experience"}{" "}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <SpinnerComp active={props.loading} />
    </div>
  );
};

export default FormExperience;
