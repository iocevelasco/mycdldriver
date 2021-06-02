import React, { useEffect, useState } from 'react';
const { useSelector } = require('react-redux');
import { Row } from 'antd';
import { withRouter } from 'next/router';
import { WrapperSection } from 'components/helpers';
import { connect } from 'react-redux';
import queryString from "query-string";
import { fetchJobPositionData, fetchLandingData } from '@store/reducers/landing_reducer';

import "./home/styles.less";
import "./home/styles/index.less";
//View components
import { HeaderLandingComp, JobsListComp, DriverList, TitleSection, ServicesList } from './home/components';
import { drivers, services, jobs } from './home/text.json';
import { filter } from 'lodash';
function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query)),
    fetchLandingData: () => dispatch(fetchLandingData()),
  }
}

const HomePage = (props) => {
  const [filters, setFilterSelected] = useState({ city: "", job_name: "", selected: false });
  const [query, setQuery] = useState('')
  const resetFilter = () => {
    setFilterSelected({ city: "", job_name: "", selected: false })
    props.fetchJobs('');
  };

  useEffect(() => {
    props.fetchLandingData();
  }, [])

  const handlerSearch = (value, key) => {
    const filterSelected = { ...filters, selected: true };
    filterSelected[key] = value;
    const stringify = queryString.stringify(filterSelected);
    setFilterSelected(filterSelected)
    setQuery(stringify)
  }

  const onkeyPress = (event) => {
    if (event.key === "Enter") {
      props.fetchJobs(query);
    }
  }

  const onSearchJobs = () => {
    props.fetchJobs(query);
  }

  const typeUser = useSelector(state => state.user.userType)
  const jobsList = useSelector(state => state.landing.jobs)
  const driversList = useSelector(state => state.landing.drivers)
  const servicesList = useSelector(state => state.landing.services)
  const cities = useSelector(state => state.landing.citys)
  const jobs_name = useSelector(state => state.landing.jobs_name)
  return (
    <>
      <HeaderLandingComp
        cities={cities}
        jobs_name={jobs_name}
        filters={filters}
        handlerSearch={handlerSearch}
        onkeyPress={onkeyPress}
        resetFilter={resetFilter}
        onSearchJobs={onSearchJobs}
        clearFilters={filters.selected}
      />
      <WrapperSection xs={24} row={18}>
        <TitleSection theme='light' title={jobs.title} subTitle={jobs.subTitle} />
        <JobsListComp jobsList={jobsList} type='large' />
      </WrapperSection>
      <WrapperSection xs={24} row={18} styles={{ background: "#001628" }} >
        <TitleSection theme='dark' title={drivers.title} subTitle={drivers.subTitle} />
        <Row justify='center' align='middle' gutter={[16, 16]}>
          <DriverList typeUser={typeUser} driversList={driversList} />
        </Row>
      </WrapperSection>
      <WrapperSection xs={24} row={18}>
        <TitleSection theme='light' title={services.title} subTitle={services.subTitle} />
        <ServicesList servicesList={servicesList} />
      </WrapperSection>
    </>
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
    (HomePage));