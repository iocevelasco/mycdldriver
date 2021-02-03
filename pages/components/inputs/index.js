import { Input, Form } from "antd";

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

export {
  DLNinput,
  EmailInput
} 
