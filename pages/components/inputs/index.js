import React, { useState } from 'react';
import { Input, Form, Select } from "antd";
import axios from 'axios';
import useListState from '@hooks/useListState';

const { Option } = Select;

const DLNinput = (props) => {
  const [validation, setValidation] = useState({
    status: "",
    message: "",
    disabled: false
  });

  const checkDln = async (dln) => {
    setValidation({
      status:"validating",
      message:"The information is being validated, please wait",
      disabled: true
    });

    await axios
      .get('/api/driver/check_dln/' + dln)
      .then((response) => {
        if(response.status === 200){
          setValidation({
            status:"error",
            message:"The dln already exists in the database",
            disabled: false
          });
        }else{
          throw "Error";
        }
      })
      .catch((err) => {
        setValidation({
          status:"success",
          message:"",
          disabled: false
        });
        console.log(err)
      })
  }

  return (
    <Form.Item
      label='DLN Number'
      name="dln"
      hasFeedback
      validateStatus={validation.status}
      help={validation.message}
      onBlur={(val) => {
          if(val.target.value){
            checkDln(val.target.value);
          }
      }}
      rules={[
        {
          required: true,
          message: 'DLN is required!',
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
            let res = patt.test(value);
            if (res) {
              return Promise.resolve();
            }
            return Promise.reject("Please enter only numbers and letters");
          },
        }),
      ]}>
      <Input disabled={validation.disabled} />
    </Form.Item>
  )
}

const EmailInput = () => {
  const [validation, setValidation] = useState({
    status: "",
    message: "",
    disabled: false
  });

  const checkMail = async (mail) => {
    setValidation({
      status:"validating",
      message:"The information is being validated, please wait",
      disabled: true
    });

    await axios
      .get('/api/user/check_mail/' + mail)
      .then((response) => {
        if(response.status === 200){
          setValidation({
            status:"error",
            message:"The email already exists in the database",
            disabled: false
          });
        }else{
          throw "Error";
        }
      })
      .catch((err) => {
        setValidation({
          status:"success",
          message:"",
          disabled: false
        });
        console.log(err)
      })
  }

  return (
    <Form.Item
      name="email"
      label="Email"
      hasFeedback
      validateStatus={validation.status}
      help={validation.message}
      rules={[
        {
          required: true,
          type: "email",
          message: 'Enter a valid email address',
        },
      ]}
      onBlur={(val) => {
          if(val.target.value){
            checkMail(val.target.value);
          }
      }}>
      <Input disabled={validation.disabled} />
    </Form.Item>
  )
}

const SelectStateInput = () => {
  const [stateOptions, isFetchingState] = useListState();
  return (
    <Form.Item label="State / Province / Reagion">
      <Form.Item
        name={'state'}
        noStyle
        rules={[{ required: true, message: 'Province is required' }]}
      >
        <Select
          placeholder="Select province">
          {
            stateOptions.options.map((e, ind) => (<Option key={ind} value={e.id} val>{e.value}</Option>))
          }
        </Select>
      </Form.Item>
    </Form.Item>
  )
}

const SelectCityInput = (props) => {
  <Form.Item label="City">
    <Form.Item
      name={'city'}
      noStyle
      rules={[{ required: true, message: 'City is required' }]}
    >
      <Select
        disabled={cityOptions.disabled}
        placeholder="Select city"
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        {
          cityOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
        }
      </Select>
    </Form.Item>
  </Form.Item>
}


export {
  DLNinput,
  EmailInput,
  SelectStateInput,
  SelectCityInput
} 
