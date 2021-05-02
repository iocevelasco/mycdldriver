
import { notification } from 'antd';
import axios from 'axios';
import { update } from './messages.json';

const fetchSource = async (url) => {
  await axios.get(url)
    .then((response) => {
      return response;
    })
    .catch(() => {
      notification.error({
        message: update.error.title,
        description: update.error.description,
      });
    })
};

export default fetchSource;