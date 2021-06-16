


import React from "react";
import { Rate, Card } from "antd";
import { number, string, bool, func } from 'prop-types';
import classNames from 'classnames';
import './styles.less';
const { Meta } = Card;

const DriversCard = (props) => {
  var driverStyles = classNames({
    'card-driver': true,
    'card-driver--dark': props.darkTheme,
  });

  return (
    <div className={driverStyles}>
      <div>
      <Card
        bordered={props.bordered}
        onClick={() => props.handleSelect(driverData)}
        className={driverStyles}
        hoverable
        cover={<img alt="driver-image" src={props.photo} />}
      >
        <Meta
          title={`${props.fullName}`}
          description={`${props.state} - ${props.city}`}
        />
        <Rate
          className="rating"
          allowHalf
          disabled
          value={props.rating}
        />
      </Card>

      </div>
    </div>
  )
}

DriversCard.propsTypes = {
  fullName: string.isRequired,
  rating: number.isRequired,
  state: string.isRequired,
  city: string.isRequired,
  photo: string.isRequired,
  darkTheme: bool.isRequired,
  handlerAction: func.isRequired,
  bordered: bool.isRequired
}

export default DriversCard;