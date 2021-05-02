import { Typography, Row, Col } from 'antd';
import classNames from 'classnames';

const { Title, Text } = Typography;


const TitleSection = ({ theme, title, subTitle }) => {
  const titleClass = classNames({
    'home__title': true,
    'home__title--dark': theme == 'dark',
    'home__title--light': theme == 'light',
  });
  return (
    <Row justify='center' align='middle' gutter={[16]} style={{ marginTop: 24 }}>
      <Col className={titleClass} span={14}>
        <Title level={2}>{title}</Title>
        <Text className='home__title-subtitle'>{subTitle}</Text>
      </Col>
    </Row>
  )
}

export default TitleSection;