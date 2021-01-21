import React, { useState, useEffect } from 'react';
import DriverDetailProps from 'components/DriverDetail';
import { Progress, Table, Space } from 'antd';
import { StarFilled } from '@ant-design/icons';

const DriverList = (props) => {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    let list = [];
    props.staffList.forEach(e => {
      e.status = 'Inactive';
      e.jobs.forEach(j => {
        if(j.status == 1){
          e.status = 'Active';
        }
      });
        
      list.push(e);
    });

    setDriverList(list)
  }, [props.staffList]);

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
    dataSource={driverList}
    loading={props.loading}
    columns={columns}
    expandable={{
      expandedRowRender: driver => {
        return <DriverDetailProps 
        driverDetail={driver} 
        isDeletable={true}
        header={props.header}
        fetchStaffList = {props.fetchStaffList} />
      }
    }}
  />
}

export default DriverList;
