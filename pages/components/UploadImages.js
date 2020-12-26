import React from 'react';
import { Form, Button, Upload, message, Avatar } from 'antd';
import { UploadOutlined, RetweetOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Dragger } = Upload;
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

const ImageProfile = ({ setImageProfile, token, imageProfile }) => {

  const propsPhoto = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: `Bearer ${token}`
    },
    async onChange(info) {
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
      if (imageProfile.length > 0) {
        try {
          const file = {
            foto: imageProfile[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setImageProfile(fileList[0].response)
    }
  };

  return (
    <div className='avatar'>
      <Avatar src={imageProfile} size={120} />
      <Upload
        {...propsPhoto}
        multiple={false}
        beforeUpload={beforeUpload}
      >
        <Button
          type='primary'
          size='small'
          shape="circle"
          icon={<RetweetOutlined />} />
      </Upload>
    </div>
  )
}

const UploadImage = ({ setImage, label, button, token, image }) => {

  const imageProps = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: `Bearer ${token}`
    },
    async onChange(info) {
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
      if (image.length > 0) {
        try {
          const file = {
            foto: image[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setImage(fileList[0].response)
    }
  };

  return (
    <Form.Item
      label={label}>
      <Upload
        {...imageProps}
        multiple={false}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>{button}</Button>
      </Upload>
    </Form.Item>
  )
}

const DraggerUpload = ({ setImage, label, button, token, image }) => {
  console.log('image', image)

  const imageProps = {
    name: 'logo',
    action: '/api/files',
    headers: {
      authorization: `Bearer ${token}`
    },
    async onChange(info) {
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
      if (image.length > 0) {
        try {
          const file = {
            foto: image[0].response.data.file
          };
          await axios.post(`/api/files/delete`, file);
        } catch (e) {
          console.log(e);
        }
      }
      setImage(fileList[0].response)
    }
  };

  return (
    <Form.Item
      label={label}>
      <Dragger
        {...imageProps}
        multiple={false}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </Form.Item>
  )
}

export {
  ImageProfile,
  UploadImage,
  DraggerUpload
}
