import React from "react";
import { connect } from "react-redux";
import { Card, Typography, Col, Row, Image, Button, Switch, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useMobileDetect from 'use-mobile-detect-hook';
import "./styles.less";


const { Title, Paragraph} = Typography

function mapStateToProps(state) {
  return {
    news: state.landing.news,
  };
}

const CardNews = (props) => {
    const { news, origin, showDrawerEdit, deleteNews, setReload } = props;
    const detectMobile = useMobileDetect();

    const onDelete = (id) => {
        deleteNews(id)
        setReload(true)
    }

    var newsStyles = classNames({
        'card-news-section': true,
        'card-news--dark': props.darkTheme,
    });

    const editNews = (news) => {
        showDrawerEdit(news)
    }

    const [ellipsis, setEllipsis] = React.useState(true);
    
    <Switch
    checked={ellipsis}
    onChange={() => {
      setEllipsis(!ellipsis);
    }}
    />

    return(

        <span className={newsStyles}>
            <Row justify="center" gutter={[16, 24]}>
                {news.map((noticia) => {
                    return (

                        <Col xs={21} lg={12}>
                            <Card style={{ marginBottom: 10, align: 'center'}}>
                                <div className="card-news__image-top">
                                    <Image src={noticia.image} align="center"></Image>
                                </div>
                                <div className="card-news__title">
                                    <div>
                                    <Title level={2}>{noticia.title}</Title>
                                    <p>{noticia.fecha}</p>
                                    </div>
                                </div>
                                <div className="card-news__content">
                                    <div className="card-news__content--text">
                                        <Paragraph ellipsis={ellipsis ? { rows: 7, expandable: false} : false}>
                                            {noticia.description}
                                        </Paragraph>
                                        {origin=="company" ?
                                        <>
                                        <Button 
                                        onClick={() => {
                                            editNews(noticia)
                                        }} 
                                        type="link" danger>
                                            edit
                                        </Button>
                                        <Tooltip placement="bottom" title="delete">
                                        <Popconfirm
                                          title="Are you sure？" okText="Yes" cancelText="No"
                                          onConfirm={() => {onDelete(noticia._id)}}
                                          onCancel={() => console.log('cancel')}
                                        >
                                          <Button type="link" shape="circle" icon={<DeleteOutlined />} />
                                        </Popconfirm>
                                        </Tooltip>
                                        </>
                                        :
                                        <Button 
                                        type="link" href={`../../../news-details?id=${noticia._id}`} danger>
                                            see more
                                        </Button>
                                        }
                                    </div>
                                        {
                                            !detectMobile.isMobile() && (
                                            <div className="card-news__content--image">
                                                <Image src={noticia.image} align="center"></Image>
                                            </div>
                                            )
                                        }
                                </div>
                            </Card>
                        </Col>
                        
                    )
                })} 
            </Row>
        </span>
    );
}

export default connect(mapStateToProps)(CardNews);