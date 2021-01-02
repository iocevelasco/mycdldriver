import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Select } from 'antd';

import useListState from '@hooks/useListState';
import axios from 'axios';
const { Option } = Select;


const AddressInputs = (props) => {
  const [stateOptions, isFetching] = useListState();

  const [cityOptions, setCities] = useState({
    options: [],
    all: [],
    disabled: true
  });

  useEffect(() => {
    try {
      if (props.stateId) {
        if (props.stateId._id) {
          fetchCities(props.stateId._id);
        } else {
          fetchCities(props.stateId);
        }
      }
    } catch (err) {
      console.log(err);
      return '';
    }
  }, [props.stateId]);

  const fetchCities = async (stateId) => {
    setCities({
      options: [],
      disabled: true
    })
    await axios.get(`/api/address/cities/${stateId}`)
      .then((response) => {
        let options = response.data.data
          .sort((a, b) => {
            if (a.cityName < b.cityName) { return -1; }
            if (a.cityName > b.cityName) { return 1; }
            return 0;
          })
          .map((e) => { return { value: e.cityName, id: e._id } })
        let all = response.data.data
        setCities({
          options,
          all,
          disabled: false
        })
      })
      .catch((err) => {
        setCities([]);
        console.log(err)
      })
  }

  function onChangeState(value) {
    fetchCities(value);
  }

  return (
    <>
      <Row gutter={[24]} justify='space-between' >
        <Col span={12}>
          <Form.Item
            name='address'
            label="Address line 1"
            rules={[
              {
                required: true,
                message: 'State is required!',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='address2'
            label="Address line 2"
            rules={[
              {
                required: true,
                message: 'Address line 2 is required!',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24]} justify='space-between' >
        <Col span={8}>
          <Form.Item label="State / Province / Reagion">
            <Form.Item
              name='state'
              noStyle
              rules={[{ required: true, message: 'Province is required' }]}
            >
              <Select
                placeholder="Select province"
                onChange={onChangeState}>
                {
                  stateOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value}</Option>))
                }
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="City">
            <Form.Item
              name='city'
              noStyle
              rules={[{ required: true, message: 'City is required' }]}
            >
              <Select
                disabled={cityOptions.disabled}
                placeholder="Select city">
                {
                  cityOptions.options.map((e, ind) => (<Option key={ind} value={e.id}>{e.value || ''}</Option>))
                }
              </Select>
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name='zipCode'
            label="Zip / Postal Code"
            rules={[
              {
                required: true,
                message: 'Zip code is required!',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default AddressInputs
