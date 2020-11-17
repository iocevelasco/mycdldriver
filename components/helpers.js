import React from 'react';
import { 
  Row, 
  Col, 
  Image, 
  Typography, 
  Result,
  Button,
  Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 60, color:'#FF2A39' }} spin />;

const WrapperSection = ({ children, xs, row, styles }) => {
  return (
    <div style={styles}>
      <Row justify='center' align='middle'>
        <Col xs={xs} lg={row} md={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

const BuildSection = () => {
  const styles = {
    wrapper: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      marginBottom: 24,
      textAlign: 'center',
      marginTop: 0
    },
    imageContainer: {
      justifyContent: 'start',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }
  return (
    <WrapperSection styles={styles.wrapper}>
      <div style={styles.imageContainer}>
        <Title style={styles.title} level={3}> Comming soon! </Title>
        <Title style={styles.title} level={2}> We're working in this section </Title>
        <Image
          width={100}
          src='/static/images/build.svg'
        />
      </div>
    </WrapperSection>
  )
}

const MessageSuccess = ({title, subTitle, extra}) => {
  const styles= {
    height: 300
  }

  return (
    <div styles={styles}> 
    <Result
      status="success"
      title={title}
      subTitle={subTitle}
      extra={extra}
      />
    </div>
  )
}

const SpinnerComp = ({active}) => {
  const styles = {
    wrapper: { 
      position:'absolute',
      left:0,
      right:0,
      top:0,
      bottom:0,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
      background:'#ffffffa3',
      zIndex:10,
    }
  }

  if(active){
    return (
      <div style={styles.wrapper}>
         <Spin indicator={antIcon} />
      </div>
    )
  }else{
    return "";
  }
}

export {
  WrapperSection,
  BuildSection,
  MessageSuccess,
  SpinnerComp
};