import DriverDetailProps from 'components/DriverDetail';
import { Progress, Table, Space } from 'antd';
import { StarFilled } from '@ant-design/icons';
const DriverList = (props) => {
  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: ((n, item) => {
        const { name, lastname } = item
        return <span> {`${name} ${lastname}`} </span>
      })
    },
    {
      title: 'Rating',
      dataIndex: 'driver',
      key: 'rate',
      width: '5%',
      render: (driver) => {
        return (
          <Space >
            {(driver.rating == 0) ?
              <StarFilled style={{ fontSize: '24px', color: '#d3d3d3' }} /> :
              <StarFilled style={{ fontSize: '24px', color: '#ffce00' }} />}
            <span> {driver.rating} </span>
          </Space>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      width: '20%',
    },
    {
      title: 'Profile complete',
      dataIndex: 'completeProfile',
      align: 'center',
      key: 'completeProfile',
      width: '40%',
      render: (n, item) => {
        return <Progress percent={Math.round(item.completeProfile)} />
      }
    },
  ];
  return <Table
    rowKey='id'
    dataSource={props.staffList}
    loading={props.loading}
    columns={columns}
    expandable={{
      expandedRowRender: driver => {
        return <DriverDetailProps driverDetail={driver} />
      }
    }}
  />
}

export default DriverList;
