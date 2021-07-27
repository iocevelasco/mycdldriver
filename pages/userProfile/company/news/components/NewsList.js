import React from 'react'
import { Row, Col, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CardNews from '../../../../components/Cards/News';
const { confirm } = Modal;

const { Text, Title } = Typography

const NewsList = (props) => {
  const { newList, setEditNew, deleteNew } = props;
  function showConfirm(id) {
    confirm({
      title: 'Do you Want to delete these service?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action can not be undone',
      onOk() {
        deleteNew(id);
      },
      onCancel() {
      },
    });
  }
  console.log('newList', newList);

  return (
    <Row gutter={[24, 24]}>
        <Col span={24}>
          <CardNews origin = 'company' />
        </Col>
    </Row>
  )
}

export default NewsList;
