import React, {useState} from "react";
import { Row, Col, notification, Typography, Drawer, Button} from "antd";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import NewsForm  from './components/NewsForm';
import NewsList from './components/NewsList';

const { Text, Title } = Typography;
// CONNECT WITH REDUX
function mapStateToProps(state) {
    return {
        user: state.user
    }
}


const FormList = (props) => {
    const detectMobile = useMobileDetect();
    const { user } = props;

    const header = {
        headers: { Authorization: `Bearer ${user.token}` }
    };
    const createNews = async (fields) => {

        await axios.post('/api/blog', fields, header)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err);
            notification['error']({
              message: 'error',
              description:
                "Sorry! We couldn't create this position, please try again. "
            });
        })
    };

    const fetchNews = async () => {

        await axios.get('/api/blog')
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err);
            notification['error']({
              message: 'error',
              description:
                "Sorry! We couldn't create this position, please try again. "
            });
        })
    };

    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = () => {
      setVisible(false);
    };
    
    return (
        <WrapperDashboard>
            <Row>
                <Col span={24} className="profile-company__news">
                    <WrapperSection row={24}>
                        <Row justify='space-between' align='middle' className='profile-company__news__header'>
                            <Col xs={22} xl={8}>
                                <Title level={3}> Create and edit your new </Title>
                                <Text> Fill the form and publish a job search, wich will we seen by our drivers</Text>
                            </Col>
                            <Col xs={22} xl={4}>
                                <Button
                                type='primary'
                                shape="round"
                                size="large"
                                onClick={showDrawer}
                                block>
                                Add new
                                </Button>
                            </Col>
                        </Row>
                    </WrapperSection>
                    <WrapperSection row={24}>
                        <div>
                            <NewsList fetchNews={fetchNews}/>
                        </div>
                    </WrapperSection>
                </Col>
            </Row>
            <Drawer 
            width={detectMobile.isMobile() ? 400 : 980}
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}>
            <div> 
                <NewsForm createNews={createNews}/> 
            </div>
            </Drawer>
        </WrapperDashboard>
    );
};

export default withRouter(
    connect(mapStateToProps)(FormList)
);