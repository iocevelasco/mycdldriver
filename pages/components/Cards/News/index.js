import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Card, Typography, Col, Row, Image, Button, Switch} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useMobileDetect from 'use-mobile-detect-hook';
import "./styles.less";
const { Title, Paragraph} = Typography

const CardNews = (props) => {
    const { origin } = props;
    const detectMobile = useMobileDetect();
    const [news, setNews] = useState([]);

    useEffect( () => {
        fetchNews()
    }, [])

    const fetchNews = async () => {

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
      };

    var newsStyles = classNames({
        'card-news-section': true,
        'card-news--dark': props.darkTheme,
    });

    const data = [
        {
            id: 1,
            title: "Maecenas scelerisque consequat sapien non iaculis",
            description: "Aenean nec vehicula felis, at accumsan sapien. Integer pretium sapien vitae turpis ultricies, non vehicula diam cursus. Sed dignissim quam ut lorem consequat, ut vehicula sem congue. Proin tincidunt mauris ut nunc semper posuere. Quisque nibh erat, semper vel tempor sed, blandit ut dui. Aenean urna enim, varius vel suscipit sed, egestas a neque. Etiam a faucibus tellus. Fusce fringilla felis eget nunc vehicula porta. Donec pharetra, magna vel sollicitudin molestie, ligula mauris tempor justo, ac fermentum tortor quam at magna.",
            fecha: '15/04/2021',
            image: 'https://image.freepik.com/foto-gratis/enfoque-selectivo-joven-mochilero-sosteniendo-mapa-papel-mujer-bonita-sombrero-sostiene-telefono-inteligente-muestra-tarjeta-credito-mano-usan-pagar-viaje-felicidad-vacaciones_1150-46951.jpg',
        },
        {
            id: 2,
            title: "Morbi vitae felis id quam feugiat efficitur a at nulla.",
            description: "Curabitur efficitur dolor sit amet dui fringilla convallis. Ut malesuada eros risus, in finibus velit ultrices vel. Curabitur mollis justo sit amet tellus iaculis, eget pharetra lacus scelerisque. Sed varius diam pulvinar quam sagittis, in consectetur purus rutrum. Praesent nunc dolor, rutrum ultrices rutrum quis, volutpat ut felis. Curabitur quis semper erat. Sed mollis quam id mattis rhoncus.",
            fecha: '18/05/2021',
            image: 'https://img.freepik.com/foto-gratis/dos-personas-sosteniendo-taza-cafe-manos-amor-calidez-mesa-madera_1150-26202.jpg?size=338&ext=jpg',
        },
        {
            id: 3,
            title: "Dauris vel ex sit amet lorem euismod ullamcorper. Donec gravida nibh vel velit laoreet, nec iaculis dolor mollis",
            description: "Sed mauris dolor, vehicula a ligula id, vulputate malesuada turpis. Fusce ultricies turpis dolor, nec auctor lacus molestie a. Donec et gravida nulla, in molestie libero. Nullam ornare, est ultrices finibus venenatis, orci justo ullamcorper lacus, ut condimentum lectus augue a dui. Duis elementum metus arcu, et congue tortor ultricies at. Etiam nec tincidunt erat, eu pulvinar magna. Fusce facilisis tincidunt justo, id porttitor libero interdum et. Suspendisse at facilisis magna",
            fecha: '21/05/2021',
            image: 'https://image.freepik.com/foto-gratis/apuesto-joven-tiene-varias-bolsas-papel_1150-47138.jpg',
        },
        {
            id: 4,
            title: "Donec nec ex sed purus vehicula aliquet semper non nulla",
            description: "Nullam aliquam, nunc vel consequat porta, orci neque lacinia sapien, nec vehicula mauris lectus sit amet mauris. Vivamus tristique, enim ut consectetur viverra, arcu felis lobortis neque, in rutrum arcu odio id felis. Sed porttitor ullamcorper tortor, eu porta augue viverra a. Morbi a imperdiet nisi, dictum placerat tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac lacus a leo congue tempor et et est. Mauris luctus auctor ipsum in pretium. Cras ac turpis et tortor viverra viverra non ac quam.",
            fecha: '5/06/2021',
            image: 'https://image.freepik.com/foto-gratis/pareja-enamorados-sentados-cafe-tomando-cafe-conversando-disfrutando-tiempo-que-pasan-juntos-enfoque-selectivo-taza_273443-2571.jpg',
        },
        {
            id: 5,
            title: "Nullam nec ultricies sem. Aenean vel maximus risus. Maecenas ex sapien, aliquet in ante et",
            description: "Curabitur efficitur dolor sit amet dui fringilla convallis. Ut malesuada eros risus, in finibus velit ultrices vel. Curabitur mollis justo sit amet tellus iaculis, eget pharetra lacus scelerisque. Sed varius diam pulvinar quam sagittis, in consectetur purus rutrum. Praesent nunc dolor, rutrum ultrices rutrum quis, volutpat ut felis. Curabitur quis semper erat. Sed mollis quam id mattis rhoncus.",
            fecha: '7/06/2021',
            image: 'https://image.freepik.com/foto-gratis/hombre-joven-buen-humor-bebiendo-te-cocina-interior-elegante-retrato-interior-pareja-despreocupada-disfrutando-desayuno_197531-12213.jpg',
        },
        {
            id: 6,
            title: "Duis eget mauris in elit aliquam aliquet ac sed nisl. Pellentesque vel velit a tortor laoreet sollicitudin sed sed magna",
            description: "Duis id sagittis odio. Fusce vitae enim bibendum, laoreet tortor vitae, posuere mauris. Aliquam maximus enim id lacus fermentum volutpat. Donec et nisi tempor, facilisis nunc nec, auctor purus. Suspendisse in eros ipsum. Quisque at porta arcu, at mattis quam. Nunc vel magna porttitor, condimentum tortor sed, aliquet nunc. In quis ligula vel nisi ultricies ullamcorper. Nulla laoreet felis at diam maximus, non dignissim nibh suscipit. Cras interdum sagittis orci, sed commodo leo consectetur non",
            fecha: '13/06/2021',
            image: 'https://image.freepik.com/foto-gratis/encantadora-pareja-romantica-tomando-cafe-teniendo-agradable-conversacion-casa_181624-34060.jpg',
        }
    ]

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
                                {
                                    props.edit && <div className="card-news__footer--actions">
                                    <Button
                                    type="link"
                                    icon={<EditOutlined />}
                                    onClick={props.actions.edit} />
                                    <Button type="link" icon={<DeleteOutlined />} onClick={props.actions.delete} />
                                    </div>
                                }
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

export default CardNews;