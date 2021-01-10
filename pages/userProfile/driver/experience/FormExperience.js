import React, { useState, useEffect } from "react";
import { Row, Col, Input, Form, Button, InputNumber, Switch, DatePicker, } from "antd";
import { SpinnerComp } from "components/helpers";
import { DLNinput } from 'components/inputs';
import { DraggerUpload } from "components/UploadImages";
import { connect } from "react-redux";


const { TextArea } = Input;

function mapStateToProps(state) {
  const { user } = state;
  return {
    experience: user.driver.experience
  };
}

const FormExperience = ({ experience, ...props }) => {
  const [switchValues, setSwitchValues] = useState({});
  const [form] = Form.useForm();

  const [twicCard, setTwicCard] = useState(false);
  const [imageDln, setImageDLN] = useState('');
  const [medicCardImage, setMedicCardImage] = useState('');
  const [switchInputs, setSwitchInputs] = useState(experience);

  useEffect(() => {
    let { imageDln, medicCardImage, twicCard } = props.user.driver;
    if (imageDln !== '') {
      setImageDLN(imageDln);
      setMedicCardImage(medicCardImage);
      setTwicCard(twicCard)
    }

    let values = {}
    experience.forEach((e) => {
      values[e.name] = {
        name: e.name,
        have: e.have,
        years: e.years
      }
    });

    setSwitchValues(values);
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
    exp.experience = newFormat;
    return exp;
  }

  const isUserRegistry = async (fields) => {
    let body = {
      dln: fields.dln,
      description: fields.description,
      expDateDln: fields.expDateDln._d,
      twicCard: twicCard,
      imageDln: imageDln,
      medicCardImage: medicCardImage,
    };

    body.experience = { ...switchValues };
    const formatExp = setFormatExperience(body);
    props.onSubmitExperience(formatExp);
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
        experience.forEach((e) => {
          if (e.name === name.name) {
            e.have = value
          }
        })
        setSwitchInputs(experience)
        setSwitchValues({
          ...switchValues,
          [name.name]: { ...switchValues[name.name], ...have },
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
                    <DLNinput />
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="DLN expiration"
                      name="expDateDln"
                      rules={[
                        {
                          required: true,
                          message: "DLN expiration date is required!",
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
                      setDefaultFileList={setImageDLN}
                      defaultFileList={imageDln}
                      token={props.token} />
                  </Col>
                  <Col span={24}>
                    <DraggerUpload
                      setDefaultFileList={setMedicCardImage}
                      defaultFileList={medicCardImage}
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
                  <h4>What kind of experience do you have</h4>
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
                          required: false,
                        },
                      ]}
                    >
                      <Switch
                        onChange={(checked) => setTwicCard(checked)}
                        checked={twicCard}
                        name={"twicCard"}
                        checkedChildren={"ON"}
                        unCheckedChildren={"OFF"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    {switchInputs.length >= 1 &&
                      switchInputs.map((inp, index) => {
                        return (
                          <Form.Item
                            className="formSwitch"
                            label={inp.name}
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
                              checked={inp.have}
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
                          initialValue={switchValues[inp].years}
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

export default connect(mapStateToProps)(FormExperience);

