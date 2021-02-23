import React,{useState,useEffect} from "react"

import { Col, Row, Typography, Card, Image, Button } from 'antd';
import { DeleteOutlined, EditOutlined, CheckCircleOutlined, PhoneOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { WrapperSection, MessageSuccess, MessageError } from 'components/helpers';
import Icon from '@ant-design/icons';
const { Title, Text } = Typography;
import "../../styles.less";

export const HeaderCard= ()=>{
    const WhatsappSvg = () => (
      <svg width="22" height="22" fill="#E73540" viewBox="-23 -21 682 682.66669">
        <path d="m544.386719 93.007812c-59.875-59.945312-139.503907-92.9726558-224.335938-93.007812-174.804687 0-317.070312 142.261719-317.140625 317.113281-.023437 55.894531 14.578125 110.457031 42.332032 158.550781l-44.992188 164.335938 168.121094-44.101562c46.324218 25.269531 98.476562 38.585937 151.550781 38.601562h.132813c174.785156 0 317.066406-142.273438 317.132812-317.132812.035156-84.742188-32.921875-164.417969-92.800781-224.359376zm-224.335938 487.933594h-.109375c-47.296875-.019531-93.683594-12.730468-134.160156-36.742187l-9.621094-5.714844-99.765625 26.171875 26.628907-97.269531-6.269532-9.972657c-26.386718-41.96875-40.320312-90.476562-40.296875-140.28125.054688-145.332031 118.304688-263.570312 263.699219-263.570312 70.40625.023438 136.589844 27.476562 186.355469 77.300781s77.15625 116.050781 77.132812 186.484375c-.0625 145.34375-118.304687 263.59375-263.59375 263.59375zm144.585938-197.417968c-7.921875-3.96875-46.882813-23.132813-54.148438-25.78125-7.257812-2.644532-12.546875-3.960938-17.824219 3.96875-5.285156 7.929687-20.46875 25.78125-25.09375 31.066406-4.625 5.289062-9.242187 5.953125-17.167968 1.984375-7.925782-3.964844-33.457032-12.335938-63.726563-39.332031-23.554687-21.011719-39.457031-46.960938-44.082031-54.890626-4.617188-7.9375-.039062-11.8125 3.476562-16.171874 8.578126-10.652344 17.167969-21.820313 19.808594-27.105469 2.644532-5.289063 1.320313-9.917969-.664062-13.882813-1.976563-3.964844-17.824219-42.96875-24.425782-58.839844-6.4375-15.445312-12.964843-13.359374-17.832031-13.601562-4.617187-.230469-9.902343-.277344-15.1875-.277344-5.28125 0-13.867187 1.980469-21.132812 9.917969-7.261719 7.933594-27.730469 27.101563-27.730469 66.105469s28.394531 76.683594 32.355469 81.972656c3.960937 5.289062 55.878906 85.328125 135.367187 119.648438 18.90625 8.171874 33.664063 13.042968 45.175782 16.695312 18.984374 6.03125 36.253906 5.179688 49.910156 3.140625 15.226562-2.277344 46.878906-19.171875 53.488281-37.679687 6.601563-18.511719 6.601563-34.375 4.617187-37.683594-1.976562-3.304688-7.261718-5.285156-15.183593-9.253906zm0 0" />
      </svg>
    );
    const WhatsappIcon = props => <Icon component={WhatsappSvg} {...props} />;
  
    return(
      <>
        <WrapperSection row={22} mt={0}>
        <div className="services-container">
        <Card style={{ height:439,width:1004 }}>
          <div className="service-container__card-top">
            <img src="https://www.hibridosyelectricos.com/media/hibridos/images/2018/08/28/2018082818515345370.jpg"></img>
          </div>
          <div className="service-container__card-description">
          <img className="service-container__card-description__img" src="https://www.ejemplos.co/wp-content/uploads/2015/11/Logo-Adidas.jpg"/>
            <Title style={{color:"#E73540",fontWeight:"500",fontSize:"32px",letterSpacing:"0.6px",marginTop:"50px"}}>Name of the service</Title>
            <span className="service-container__card-description__title">Arizona - Phonex</span>
            <div style={{display:"flex",justifyContent:"space-between"}}>
            <div className="service-container__card-description__comunication">
                <div>
                  <div >
                      <PhoneOutlined/>
                  <span>Phone number</span>
                </div>
                <div className="service-container__card-description__comunication__email">
                    <MailOutlined/>
                  <span >Email</span>
                  </div>
                </div>
              </div>
              <div className="service-container__card-description__wp">
                <WhatsappIcon height={22} width={22} fill="#E73540"/>
                 <span>Whatsapp</span>
              </div>
              </div>
          </div>
        </Card>,
        </div>
        </WrapperSection>
      </>
    )
  }
  
 export  const DescriptionCard=()=>{
    const [list,setList]= useState([0,1,2,3,4,5,6,7,8,9,10])
    return(
      <WrapperSection row={22} mt={0}>
      <div className="services-container">
      <Card style={{ width:1004,marginBottom:"32px" }}>
       <div className="description-job">
         <div className="description-job--wrapper" style={{borderBottom:"1px solid #dadada"}}>
  
          <span className="description-job__title">Description of the job</span>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
             sed diam nonumy eirmod tempor invidunt ut</p>
             <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
             sed diam nonumy eirmod tempor invidunt ut</p>
        </div>
       </div>
       <div>
       <div className="description-job--wrapper">
          <span className="description-job__title">Include</span>
      <div className="description-job--wrapper__list">
        {list && list.map((index)=>{
          return(
            <div className="description-job-wrapper__list--container" key={index}>
            <div className="description-job--wrapper-list__circle"></div>
          <span>Lorem ipsum dolor sit amet, consetetur sadipscing elit</span>
          </div>
          )
        })}
       
      
      </div>
  </div>
       </div>
  
      </Card>
      </div>
      </WrapperSection>
    )
  }
  
 export const SimilarServices = ()=>{
    const [repeat,setRepeat] = useState([1,2,3,4])
    return(
      <WrapperSection row={17} mt={0} >
      <div className="similar-container">
          <h2>Similar services</h2>
          <div className="similar-container__box-card">
          {repeat && repeat.map((ind)=>{
            return(
              <Card style={{ width:239, height:262 }} key={ind}>
            <div className="similar-container__box-card__info">
              <img src="https://www.ejemplos.co/wp-content/uploads/2015/11/Logo-Adidas.jpg"/>
              <h3>Name of the service with 2 rows</h3>
              <span>Arizona - Phoenix</span>
              <span style={{marginTop:"36px"}}>10 days ago</span>
            </div>
  
             </Card>
            )
          })}
    
          </div>
          <span className="similiar-container__viewMore">View more</span>
  
      </div>
      </WrapperSection>
    )
  }




  