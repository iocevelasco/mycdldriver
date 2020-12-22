import React from 'react';
import { Row, Col} from 'antd';

const WrapperSection = ({ children, row, styles }) => {
  return (
    <div style={styles}>
      <Row justify='center' align='middle'>
        <Col span={row}>
          {children}
        </Col>
      </Row>
    </div>
  )
}

export default WrapperSection;