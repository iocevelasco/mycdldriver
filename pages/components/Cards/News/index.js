import React, {useEffect, useState} from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { fetchNews } from "@store/reducers/landing_reducer";
import { Card, Typography, Col, Row, Image, Button, Switch} from "antd";
import classNames from 'classnames';
import useMobileDetect from 'use-mobile-detect-hook';
import "./styles.less";
const { Title, Paragraph} = Typography

function mapStateToProps(state) {
  return {
    news: state.landing.news,
    // deviceType: state.landing.deviceType
  };
}

const CardNews = (props) => {
    const { news } = props;
    const detectMobile = useMobileDetect();
    //const [news, setNews] = useState([]);

    useEffect( () => {
        fetchNews()
    }, [])

    /*const fetchNews = async () => {

        await axios.get('/api/blog')
          .then((response) => {
              const data = response.data.data;
              setNews(data);
            console.log(data)
          })
          .catch((err) => {
            console.log(err);
            notification['error']({
              message: 'error',
              description:
                "Sorry! We couldn't create this position, please try again. "
            });
        })
    };*/

    var newsStyles = classNames({
        'card-news-section': true,
        'card-news--dark': props.darkTheme,
    });

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
                                        <Button type="link" href="../../../news-details" danger>
                                            Ver mas
                                        </Button>
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