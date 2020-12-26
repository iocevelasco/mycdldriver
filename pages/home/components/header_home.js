import React from 'react';
import { Row, Col, Typography, Input, Select, Button, AutoComplete } from 'antd';
import { fetchJobPositionData } from '@store/reducers/landing_reducer';
import { connect } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

function mapStateToProps(state) {
  return {
    citys: state.landing.citys || [],
    jobs_name: state.landing.jobs_name || []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJobs: (query) => dispatch(fetchJobPositionData(query))
  }
}

const HeaderLandingComp = ({ handlerSearch, filter_selected, jobs_name, citys, query, fetchJobs }) => {
  return (
    <>
      <div className="home-header"
        style={{
          background: `url('/static/images/truck11.jpg')`
        }}>
        <Row justify='center' align='middle'>
          <Col xs={24} lg={18} md={18}>
            <div className="home-header__input-container">
              <Title> TEAMWORK & LOYALTY <br />
                      DRIVING OUR SUCCESS
                    </Title>
              <Row gutter={[16]}>
                <Col xs={24} lg={12} md={12}>
                  <AutoComplete
                    options={jobs_name}
                    size='large'
                    style={{ width: '100%' }}
                    placeholder="Search your new job"
                    onChange={e => handlerSearch(e, 'input')} />
                </Col>
                <Col xs={24} lg={8} md={8}>
                  <Select
                    size="large"
                    style={{ width: '100%' }}
                    value={filter_selected.city}
                    placeholder="Search by city"
                    onChange={e => handlerSearch(e, 'city')}>
                    {
                      citys.map((e, i) => (
                        <Option key={i} value={e.id}>{e.name}</Option>
                      ))
                    }
                  </Select>
                </Col>
                <Col xs={24} lg={4} md={4}>
                  <Button
                    onClick={() => fetchJobs(query)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        fetchJobs(query)
                      }
                    }}
                    size="large"
                    style={{ width: '100%' }}
                    type="primary">Search </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderLandingComp);

