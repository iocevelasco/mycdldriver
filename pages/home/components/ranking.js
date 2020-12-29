import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Button
} from 'antd';
import { connect } from 'react-redux';
import { fetchDriversData } from '@store/reducers/landing_reducer';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { withRouter } from 'next/router';

const { Text, Title } = Typography
const { Meta } = Card;

function mapStateToProps(state) {
  console.log('[ STATE ]', state);
  return {
    drivers: state.landing.drivers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDrivers: () => dispatch(fetchDriversData())
  }
}

const RankingComp = ({ drivers, fetchDrivers }) => {

  useEffect(() => {
    fetchDrivers();
  }, [])

  const stars = [1, 2, 3, 4, 5]
  return (
    <>
      {
        drivers.map((e, key) => {
          return (
            <Col key={key} className="home--ranking" lg={6} md={12} sm={22}>
              <Card
                hoverable={true}
                cover={
                  <img
                    alt="example"
                    src={e.photo}
                  />
                }
                style={{ width: '100%', marginTop: 24, }}>
                <div className='star-container'>{e.rating}
                  {e.driver.rating == 0 ?
                    <StarOutlined key={key} style={{ color: '#FFE206' }} /> :
                    stars.map((p, key) => {
                      {
                        if (p <= e.driver.rating) {
                          <StarFilled key={key} style={{ color: '#FFE206' }} />
                        }
                      }
                    })
                  }
                </div>
                <Meta
                  title={`${e.name} ${e.lastname}`}
                  description={`Address ${e.driver.address}`}
                />
              </Card>
            </Col>
          )
        })
      }
    </>
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RankingComp));