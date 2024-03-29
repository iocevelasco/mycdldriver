import React, {useState, useEffect} from "react";
import { Row, Col, notification, Typography, Drawer, Button} from "antd";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { fetchNews } from "@store/reducers/landing_reducer";
const { useDispatch } = require('react-redux');
import { WrapperDashboard, WrapperSection } from 'components/helpers';
import useMobileDetect from 'use-mobile-detect-hook';
import NewsForm  from './components/NewsForm';
import NewsList from './components/NewsList';
import './styles.less';

const { Text, Title } = Typography;
// CONNECT WITH REDUX
function mapStateToProps(state) {
    return {
        user: state.user
    }
}


const FormList = (props) => {
    const dispatch = useDispatch();
    const detectMobile = useMobileDetect();
    const { user } = props;
    const [visible, setVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [dataEdit, setDataEdit] = useState(false);

    useEffect(() => {
        dispatch(fetchNews());
        setReload(false);
    }, [reload]);

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
    const editNews = async (fields) => {

        await axios.patch('/api/blog', fields, header)
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

    const deleteNews = async (id) => {

        await axios.delete('/api/blog/'+id, header)
          .then((response) => {
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

    const showDrawerEdit = (notice) => {
        setVisible(true);
        setDataEdit(notice)
    }

    const showDrawer = () => {
      setVisible(true);
      setDataEdit(null)
    };
    const onClose = () => {
      setVisible(false);
    };
    
    return (
        <WrapperDashboard>
            <Row>
                <Col span={24} className="profile-company__news">
                    <WrapperSection row={24}>
                        <Row gutter={[12, 12]} justify='space-between' align='middle' className='add-new__header'>
                            <Col xs={22} xl={8}>
                                <div className="add-new__header--title">
                                    <Title level={3}> Create and edit your new </Title>
                                    <Text>Fill out the form and publish the news of interest that our drivers will see</Text>
                                </div>
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
                            <NewsList
                            showDrawerEdit={showDrawerEdit}
                            deleteNews={deleteNews}
                            setReload={setReload}/>
                        </div>
                    </WrapperSection>
                </Col>
            </Row>
            <Drawer 
            width={detectMobile.isMobile() ? 300 : 980}
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}>
            <div> 
                <NewsForm 
                createNews={createNews} 
                setReload={setReload} 
                dataEdit={dataEdit}
                editNews={editNews}/> 
            </div>
            </Drawer>
        </WrapperDashboard>
    );
};

export default withRouter(
    connect(mapStateToProps)(FormList)
);