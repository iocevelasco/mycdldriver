import React from 'react';
import { Form, Button, Upload, message, Avatar, } from 'antd';
import { UploadOutlined, RetweetOutlined } from '@ant-design/icons';
import axios from 'axios';



const onChange = async (info, setFileList) => {
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
    setFileList(fileList);
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

const UploadImage = (props) => {
  return (
    <Form.Item>
      <Upload
        action='/api/files'
        onChange={(file) => onChange(file, props.setImage)}
        headers={
          authorization = `Bearer ${props.oken}`
        }
        fileList={props.fileList}
        beforeUpload={beforeUpload}
      >
        <Button icon={<UploadOutlined />}>Add your DLN picture</Button>
      </Upload>
    </Form.Item>
  )
}

export {
  ImageProfile,
  UploadImage
}
