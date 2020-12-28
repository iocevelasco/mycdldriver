import React from 'react';
import { useState } from 'react';
import { Form, Button, Upload, message, Avatar, Image } from 'antd';
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

const ImageProfile = ({ setNewImage, newImage, avatar }) => {
  console.log('avatar', avatar);
  const uploadImage = async options => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("logo", file);
    try {
      const res = await axios.post(
        '/api/files',
        fmData,
      );
      onSuccess(res.data.data.file);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
    }
  };

  const handleOnChange = ({ file }) => {
    setNewImage(file.response);
  };

  return (
    <div className='avatar'>
      <Avatar src={avatar} size={120} />
      <Upload
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="text"
        defaultFileList={newImage}
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

const DraggerUpload = ({ defaultFileList, setDefaultFileList, label, button, token, image }) => {
  axios.defaults.headers.post['authorization'] = `Bearer ${token}`;
  const uploadImage = async options => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    fmData.append("logo", file);
    try {
      const res = await axios.post(
        '/api/files',
        fmData,
      );
      onSuccess(res.data.data.file);
    } catch (err) {
      console.log("Error: ", err);
      onError({ err });
    }
  };

  const handleOnChange = ({ file }) => {
    setDefaultFileList(file.response);
  };

  return (
    <Form.Item
      label={label}>
      <Dragger
        customRequest={uploadImage}
        onChange={handleOnChange}
        listType="picture-card"
        defaultFileList={defaultFileList}
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
  DraggerUpload
}
