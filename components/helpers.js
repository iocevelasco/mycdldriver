import React from 'react';
import { 
  Row, 
  Col, 
  Image, 
  Typography, 
  Result,
  Button
} from 'antd';
const { Title, Text } = Typography

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

export {
  WrapperSection,
  BuildSection,
  MessageSuccess
};