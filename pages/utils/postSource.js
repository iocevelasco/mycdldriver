
import { notification } from 'antd';
import axios from 'axios';
import { post } from './messages.json';

const postSource = async (url, body) => {
  await axios.post(`/api/${url}`, body)
    .then(() => {
      notification.success({
        message: post.success.title,
        description: post.success.description,
      });
    })
    .catch(() => {
      notification.error({
        message: post.error.title,
        description: post.error.description,
      });
    })
};

export default postSource