
import { notification } from 'antd';
import axios from 'axios';
import { update } from './messages.json';

const updateSource = async (type, data, id,) => {
  const param = id ? '/' + id : ''
  await axios.patch(`/api/${type}${param}`, data)
    .then(() => {
      notification.success({
        message: update.success.title,
        description: update.success.description,
      });
      //window.location.reload();
    })
    .catch(() => {
      notification.error({
        message: update.error.title,
        description: update.error.description,
      });
    })
};

export default updateSource;