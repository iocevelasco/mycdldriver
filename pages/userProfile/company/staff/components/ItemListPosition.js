import { Row, Col, List, Space, Avatar, Button } from 'antd';
import { StarFilled, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

const ItemListPosition = (props) => {
  const { item, record } = props;
  const styles = {
    listJObs: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
  return (
    <List.Item
      key={item._d}
      actions={[
        <Button
          icon={<CheckCircleOutlined />}
          shape="round"
          size="large"
          type='primary'
          onClick={() => props.showRate(item, record)}>
          Rate this driver
        </Button>,
        <Button
          icon={<WarningOutlined />}
          type='link'
          onClick={() => props.openDrawer('create-incident')}>
          Report incident
      </Button>
      ]}>
      <div style={{ width: '100%' }}>
        <Row gutter={[24]} justify='space-between' align='middle'>
          <Col span={2}>
            <Avatar shape="square" size={80} src={item.logo} />
          </Col>
          <Col span={1}>
            <Space>
              <StarFilled style={{ fontSize: '24px', color: '#ffce00' }} />
              <span> {item.apply.ranking} </span>
            </Space>
          </Col>
          <Col span={18}>
            <div style={styles.listJObs}>
              <p>{item.title} </p>
            </div>
          </Col>
        </Row>
      </div>
    </List.Item>
  )
};

export default ItemListPosition;