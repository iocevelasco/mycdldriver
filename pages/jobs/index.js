import React, { useEffect, useReducer } from 'react';
import MainLayout from '../../components/layout';
import { Row, Col, Typography, Input, DatePicker, Select, Card } from 'antd';
import { withRouter } from 'next/router'
import axios from 'axios';


const Jobs = (props) => {
  return (
    <>
      <MainLayout title='Wellcome'>
        <p>pepe</p>
      </MainLayout>
    </>
  )
}

export default withRouter(Jobs);