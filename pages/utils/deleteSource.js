
import { notification } from 'antd';
import axios from 'axios';
import message from './messages.json';

const deleteSource = async (type, id, token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` }
  };
  await axios.delete(`/api/${type}/${id}`, header)
    .then(() => {
      notification.success({
        message: message.success.title,
        description: message.success.description,
      });
      window.location.reload();
    })
    .catch(() => {
      notification.error({
        message: message.error.title,
        description: message.error.description,
      });
    })
};

export default deleteSource