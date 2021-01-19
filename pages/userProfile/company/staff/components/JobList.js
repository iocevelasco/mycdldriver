import { Row, Col, List, Table, Avatar, Button, Typography } from 'antd';
import { StarFilled, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const JobsList = ({ staffList, ...props }) => {
  const styles = {
    listJObs: {
      display: 'flex',
      flexDirection: 'column',
    }
  }
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: ((n, item) => {
        const { name, lastname } = item
        return <span> {`${name} ${lastname}`} </span>
      })
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      width: '20%',
    }
  ];
  return (
    <Table
      rowKey='id'
      dataSource={staffList}
      loading={props.loading}
      columns={columns}
      expandable={{
        expandedRowRender: record => (
          <List
            header={<Title level={4}>Current jobs</Title>}
            itemLayout="horizontal"
            bordered
            dataSource={record.jobs}
            renderItem={item => {
              return <List.Item
                key={item._d}
                actions={[<Row>
                  <Col xs={24} xl={12}>
                    <Button
                      icon={<CheckCircleOutlined />}
                      shape="round"
                      size="large"
                      type='primary'
                      onClick={() => props.showRate(item, record)}>
                      Rate this driver
                      </Button>
                    </Col>
                    <Col xs={24} xl={12}>
                      <Button
                        icon={<WarningOutlined />}
                        type='link'
                        onClick={() => props.openDrawer('create-incident', record, item)}>
                        Report incident
                      </Button>
                    </Col>
                </Row>
                ]}>
                <div style={{ width: '100%' }}>
                  <Row gutter={[24]} justify='space-between' align='middle'>
                    <Col xs={6} xl={2}>
                      <Avatar shape="square" size={80} src={item.logo} />
                    </Col>
                    <Col xs={16} xl={18}>
                      <div style={styles.listJObs}>
                        <p>{item.title} </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </List.Item>
            }}
          />
        )
      }} />)
};

export default JobsList;