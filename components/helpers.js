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

const MessageSucces = () => {
  const styles= {
    height: 300
  }

  return (
    <div styles={styles}> 
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Go Console
      </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
      />
    </div>
  )
}

export {
  WrapperSection,
  BuildSection,
  MessageSucces
};