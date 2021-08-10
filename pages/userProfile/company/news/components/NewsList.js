import React from 'react'
import { Row, Col, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CardNews from '../../../../components/Cards/News';
const { confirm } = Modal;

const NewsList = (props) => {
  const { newList, setEditNew, deleteNews, showDrawerEdit, setReload } = props;

  return (
    <Row gutter={[24, 24]}>
        <Col span={24}>
          <CardNews 
          origin = 'company'
          showDrawerEdit={showDrawerEdit} 
          deleteNews={deleteNews}
          setReload={setReload}
          />
        </Col>
    </Row>
  )
}

export default NewsList;
