import React from 'react';
import { Form, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';

function mapStateToProps(state) {
  const { user } = state;
  return {
    token: user.token || null,
  }
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UploadImage = () => {

  const onChange = async () => {
    {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      });

      if (photo > 0) {
        try {
          const file = {
            foto: photo[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      props.setFileList(fileList);
    }
  }
  return (
    <Form.Item>
      <Upload
        name='image'
        action='/api/files'
        onChange={onChange}
        headers={
          authorization = `Bearer ${props.token}`
        }
        fileList={props.fileList}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Add your DLN picture</Button>
      </Upload>
    </Form.Item>
  )
}


export default withRouter(
  connect(mapStateToProps)(UploadImage)
); 