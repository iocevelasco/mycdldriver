import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 60, color:'#FF2A39' }} spin />;

<Spin indicator={antIcon} />

const SpinnerComp = () => {
  return (
    <div style={styles.wrapper}>
       <Spin indicator={antIcon} />
    </div>
  )
}

const styles = {
  wrapper: { 
    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    background:'#ffffffa3',
    zIndex:10,
  }
}

export default SpinnerComp;