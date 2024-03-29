import { useState } from 'react';
import { Form, Button, Upload, message, Avatar, Image } from 'antd';
import { RetweetOutlined, InboxOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
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

const ImageProfile = ({ setNewImage, shape, newImage, avatar }) => {

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
      <Avatar shape={shape} icon={<UserOutlined />} src={avatar} size={120} />
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

const DraggerUpload = ({ defaultFileList, setDefaultFileList, label }) => {

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
      <div className='dragger'>
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
        </Dragger>
        {
          defaultFileList &&
          <div className="dragger--image">
            <Button onClick={() => setDefaultFileList('')} type="primary" size='small' shape="circle" icon={<DeleteOutlined />} />
            <Image heigth={200} src={defaultFileList} />
          </div>
        }
      </div>
    </Form.Item>
  )
}

const UploadMultiple = ({ fileList, setFileList }) => {

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

  const handleOnChange = ({ file, fileList }) => {
    setFileList(fileList);
  };

  return (
    <Form.Item
      label='Upload images'>
      <div className='dragger'>
        <Dragger
          customRequest={uploadImage}
          onChange={handleOnChange}
          listType="picture-card"
          fileList={fileList}
          multiple={true}
          beforeUpload={beforeUpload}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </div>
    </Form.Item>
  )
}

const ImageUpload = ({ setNewImage, shape, newImage, avatar }) => {

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
      <Avatar shape={shape} icon={<UserOutlined />} src={avatar} size={120} />
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

export {
  ImageProfile,
  DraggerUpload,
  beforeUpload,
  UploadMultiple,
  ImageUpload
}
