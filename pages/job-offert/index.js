import React, { useEffect, useReducer, useState, useRef } from "react";
import {
  Row,
  Col,
  Typography,
  Input,
  Select,
  Avatar,
  Button,
  Drawer,
  Divider,
  Carousel,
} from "antd";
import FormUserDriver from "components/FormUserDriver";
import { SpinnerComp } from "components/helpers";
import {
  WrapperSection,
  MessageSuccess,
  MessageError,
} from "components/helpers";
import { withRouter } from "next/router";
import { handlerModalLogin } from "@store/reducers/landing_reducer";
import { connect } from "react-redux";
import JobListComp from "../home/components/job_offerts";
import moment from "moment";
import axios from "axios";
import useMobileDetect from "use-mobile-detect-hook";
import JobCardComponent from "../components/JobCard";
import "./styles.less";
const { Title, Text } = Typography;

const initialState = {
  showSuccess: false,
  showError: false,
  title: "",
  logo: "",
  can_apply: false,
  postion_id: 0,
  description: "",
  address: "",
  date: "",
  expire_date: "",
  company_name: "",
  tradename: "",
  photo: "",
};

const types = {
  FETCH_DETAIL: "FETCH_DETAIL",
  SHOW_SUCCESS: "SHOW_SUCCESS",
  SHOW_ERROR: "SHOW_ERROR",
  PROPS_APPLY: "PROPS_APPLY",
  SHOW_DRAWER: "SHOW_DRAWER",
  PROPS_BASE: "PROPS_BASE",
  PROPS_DRIVER: "PROPS_DRIVER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.carousel_data:
      return { ...state, carousel_data: action.payload };
    case types.FETCH_DETAIL:
      return { ...state, ...action.payload };
    case types.SHOW_DRAWER:
      return { ...state, visible: action.payload };
    case types.SHOW_SUCCESS:
      return { ...state, showSuccess: action.payload };
    case types.SHOW_ERROR:
      return { ...state, showError: action.payload };
    case types.PROPS_APPLY:
      return { ...state, can_apply: action.payload };
    default:
      throw new Error("Unexpected action");
  }
};

function mapStateToProps(state) {
  console.log("`[state]`", state);
  return {
    isUserRegistry: state.user.typeUser,
    user: state.user,
    isLogin: state.user.isLogin,
    jobs: state.landing.jobs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleModal: (prop) => dispatch(handlerModalLogin(prop)),
  };
}

const JobOffert = ({ user, router, isUserRegistry, deviceType, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isMounted, setMounted] = useState(false);
  const detectMobile = useMobileDetect();
  const slider = useRef();
  useEffect(() => {
    if (props.isLogin && user.typeUser === 0) {
      dispatch({ type: types.SHOW_DRAWER, payload: true });
    }
  }, [props.isLogin]);

  useEffect(() => {
    let job_id = router.query.id;
    fetchJobDetails(job_id);
  }, [router.query.id]);

  const fetchJobDetails = async (job_id) => {
    setMounted(true);
    let applyJob = {
      id: job_id,
    };
    if (props.isLogin && user.typeUser === 1) {
      applyJob.driver = user._id;
    }
    await axios
      .post(`/api/company/jobs/detail`, applyJob)
      .then((response) => {
        const {
          title,
          logo,
          phoneNumber,
          email,
          can_apply,
          postion_id,
          description,
          address,
          date,
          company_name,
          company,
        } = response.data.data;
        let detail = {
          title: title || "",
          logo: logo || "",
          can_apply: can_apply || false,
          postion_id: postion_id || 0,
          description: description || "",
          address: address || "",
          date: moment(date).format("MM DD YYYY") || "",
          company_name: company_name || "",
          tradename: company ? company.tradename : "",
          photo: company ? company.photo : "",
          phoneNumber: phoneNumber,
          email: email,
        };
        setMounted(false);
        dispatch({ type: types.FETCH_DETAIL, payload: { ...detail } });
      })
      .catch((err) => console.log("err", err));
  };

  async function saveApply() {
    try {
      const header = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const apply = {
        job: router.query.id,
      };
      await axios.post("/api/company/jobs/apply", apply, header);
      dispatch({ type: types.SHOW_SUCCESS, payload: true });
      dispatch({ type: types.PROPS_APPLY, payload: false });
    } catch (e) {
      dispatch({ type: types.SHOW_ERROR, payload: true });
      console.log(e);
    }
  }

  return (
    <>
      <WrapperSection row={22} mt={0}>
        <div className="job-offert__detail">
          <Row>
            <Col className="" xs={24} xl={24} lg={24}>
              <div
                className="header"
                style={{
                  backgroundImage: `url('${state.logo}')`,
                }}
              >
                <Avatar size={130} src={state.photo} alt="image" />
              </div>
              <div>
                <Title> {state.title} </Title>
                <Title level={5}> {state.tradename} </Title>
                <div>
                  <Text> Address </Text>
                  <Text strong> {state.address} </Text> <Text strong> | </Text>
                  <Text> Date </Text>
                  <Text strong> {state.date} </Text>
                </div>
                <div>
                  <Text> Phone </Text>
                  <Text strong>
                    {" "}
                    {state.areaCode} - {state.phoneNumber}{" "}
                  </Text>{" "}
                  <Text strong> | </Text>
                  <Text> Email </Text>
                  <Text strong> {state.email} </Text>
                </div>
              </div>
              <Divider />
              <Text className="description">{state.description}</Text>
              {!isUserRegistry ? (
                <Button
                  shape="round"
                  size="large"
                  type="primary"
                  style={{
                    marginTop: 16,
                    width: "90%",
                    marginLeft: 12,
                  }}
                  onClick={() => {
                    props.handleModal(true);
                  }}
                >
                  Complete the login and apply to this position
                </Button>
              ) : state.can_apply ? (
                isUserRegistry == 2 ? (
                  <Button
                    shape="round"
                    size="large"
                    type="primary"
                    style={{
                      marginTop: 16,
                      width: "90%",
                      marginLeft: 12,
                    }}
                    disabled
                  >
                    Available only for drivers
                  </Button>
                ) : (
                  <Button
                    shape="round"
                    size="large"
                    type="primary"
                    style={{
                      marginTop: 16,
                      width: "90%",
                      marginLeft: 12,
                    }}
                    onClick={saveApply}
                  >
                    Apply
                  </Button>
                )
              ) : (
                <Button
                  shape="round"
                  size="large"
                  type="primary"
                  style={{
                    marginTop: 16,
                    width: "90%",
                    marginLeft: 12,
                  }}
                  disabled
                >
                  You already applied for this job
                </Button>
              )}
            </Col>
            <Col className="job-offert__list" xs={24} lg={24} xl={24}>
              <Row justify="center" align="middle">
                <Title level={3}>Related searches</Title>
              </Row>
              <Row justify="center" align="middle">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  {console.log(detectMobile.isMobile(), "is mobile")}
                  <Carousel
                    dots={false}
                    autoplay={false}
                    infinite={false}
                    arrows={detectMobile.isDesktop()}
                    slidesToShow={detectMobile.isMobile() ? 1 : 2}
                    slidesToScroll={detectMobile.isMobile() ? 1 : 2}
                    ref={(ref) => {
                      slider.current = ref;
                    }}
                  >
                    {props.jobs.map((item) => {
                      return (
                        <JobCardComponent
                          key={item._id}
                          item={item}
                          type="small"
                        />
                      );
                    })}
                  </Carousel>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Drawer
          title="Success apply"
          placement="right"
          closable={true}
          width={720}
          visible={state.showSuccess}
          onClose={() => {
            dispatch({ type: types.SHOW_SUCCESS, payload: false });
          }}
        >
          <MessageSuccess
            title="You applied successfully"
            subTitle="Thank you for applying to this vacancy, the company will contact you as soon as possible."
          />
        </Drawer>
        <Drawer
          title="Error apply"
          placement="right"
          closable={true}
          width={720}
          visible={state.showError}
          onClose={() => {
            dispatch({ type: types.SHOW_ERROR, payload: false });
          }}
        >
          <MessageError
            title="You applied not successfully"
            subTitle="Thank you for applying to this vacancy, the company will contact you as soon as possible."
          />
        </Drawer>

        <Drawer
          title="Complete your profile"
          placement="right"
          closable={true}
          width={680}
          onClose={() => {
            dispatch({ type: types.SHOW_DRAWER, payload: false });
          }}
          visible={state.visible}
        >
          <FormUserDriver
            action={
              <Button
                shape="round"
                size="large"
                type="primary"
                style={{
                  width: "100%",
                }}
                onClick={saveApply}
              >
                Send request
              </Button>
            }
          />
        </Drawer>
        <SpinnerComp active={isMounted} />
      </WrapperSection>
    </>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JobOffert)
);
