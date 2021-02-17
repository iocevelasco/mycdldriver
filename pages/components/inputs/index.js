import { Input, Form, Select } from "antd";
import useListState from '@hooks/useListState';

const { Option } = Select;

const DLNinput = (props) => {
  return (
    <Form.Item
      label='DLN Number'
      name="dln"
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
      <Input />
    </Form.Item>
  )
}

const EmailInput = () => {
  return (
    <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          required: true,
          type: "email",
          message: 'Enter a valid email address',
        },
      ]}>
      <Input />
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
