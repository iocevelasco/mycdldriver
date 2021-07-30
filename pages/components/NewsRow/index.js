import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Row, Col, Typography, Image} from 'antd';
import './styles.less'

const {Title, Text, Paragraph} = Typography


const NewsRow = (props) => {

    useEffect(() => {
        let new_id = router.query.id;
        getNew(new_id)
    }, [router.query.id]);

    const getNew = async (id) => {
        await axios.get(`/api/blog/${id}`)
            .then((response) => {
                console.log(response.data.data)
        })
        .catch((e) => {

        })
    }

    return(
        <Row justify='center'>
            <Col xs={22} lg={20}>
                <div className="news-details__top">
                <div className="news-details__top--title">
                    <Title level={2}> 
                        Dauris vel ex sit amet lorem euismod ullamcorper. 
                        Donec gravida nibh vel velit laoreet, nec iaculis dolor mollis
                    </Title>
                </div>
                <div className="news-details__top--summary">
                    <Text>
                        Sed mauris dolor, vehicula a ligula id, vulputate malesuada turpis. Fusce ultricies turpis dolor, 
                        nec auctor lacus molestie a. Donec et gravida nulla, in molestie libero. Nullam ornare, est ultrices 
                        finibus venenatis, orci justo ullamcorper lacus, ut condimentum lectus augue a dui. Duis elementum metus 
                        arcu, et congue tortor ultricies at. Etiam nec tincidunt erat, eu pulvinar magna. 
                        Fusce facilisis tincidunt justo, id porttitor libero interdum et. Suspendisse at facilisis magna
                    </Text>
                    <p style={{fontSize: 13, marginTop: 5}}>17/09/2021</p>
                </div>
                </div>
            </Col>
            <Col xs={22} lg={20}>
                <div className="news-details__img" align="center">
                  <Image width={'100%'} src="https://image.freepik.com/foto-gratis/enfoque-selectivo-joven-mochilero-sosteniendo-mapa-papel-mujer-bonita-sombrero-sostiene-telefono-inteligente-muestra-tarjeta-credito-mano-usan-pagar-viaje-felicidad-vacaciones_1150-46951.jpg"></Image>
                </div>
            </Col>
            <Col xs={22} lg={20}>
                <div  className='news_details-description'>
                    <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Vestibulum lorem sed risus ultricies. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. 
                    Mauris rhoncus aenean vel elit scelerisque mauris pellentesque.
                    </Paragraph>
                        
                    <Paragraph>
                    Dignissim convallis aenean et tortor at risus viverra adipiscing. Velit ut tortor pretium viverra suspendisse. 
                    Mauris pellentesque pulvinar pellentesque habitant morbi tristique. Ipsum suspendisse ultrices gravida dictum 
                    fusce ut placerat. Congue eu consequat ac felis. Massa sed elementum tempus egestas. Sapien pellentesque habitant 
                    morbi tristique senectus et netus et. Nisl vel pretium lectus quam id leo in. Et magnis dis parturient montes nascetur. 
                    Vestibulum mattis ullamcorper velit sed ullamcorper. Fermentum leo vel orci porta non pulvinar neque laoreet suspendisse.
                    Eu augue ut lectus arcu. In hendrerit gravida rutrum quisque non tellus orci ac. Amet venenatis urna cursus eget nunc scelerisque. 
                    Neque sodales ut etiam sit amet nisl purus in mollis. 
                    </Paragraph>

                    <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Vestibulum lorem sed risus ultricies. Non pulvinar neque laoreet suspendisse interdum consectetur libero id. 
                    Mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Vitae semper quis lectus nulla at volutpat diam ut venenatis. 
                    Nunc id cursus metus aliquam eleifend mi in nulla posuere. Varius morbi enim nunc faucibus a pellentesque sit amet. 
                    Ullamcorper a lacus vestibulum sed arcu non. Auctor eu augue ut lectus arcu bibendum at varius. Leo vel orci porta non. 
                    Amet nisl purus in mollis nunc sed id semper risus.
                    </Paragraph>
                </div>
            </Col>
            <Col xs={22} lg={18}>
                <div className="news-details__img" align="center">
                  <Image height={'100%'} src="https://image.freepik.com/foto-gratis/apuesto-joven-tiene-varias-bolsas-papel_1150-47138.jpg"></Image>
                </div>
            </Col>
        </Row>
    );
}

export default NewsRow;