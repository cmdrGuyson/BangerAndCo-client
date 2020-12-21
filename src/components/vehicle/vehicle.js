import React from "react";
import { Card, Badge } from "react-bootstrap";

//CSS
import "./vehicle.scss";

export default function Vehicle(props) {
  const {
    _id,
    imageURL,
    model,
    brand,
    rent,
    fuelType,
    transmission,
  } = props.vehicle;

  return (
    <Card className="vehicle-box" key={_id}>
      <div className="vehicle-ribbon">
        <span>{`$${rent}`}</span>
      </div>
      <Card.Img className="vehicle-image" src={imageURL}></Card.Img>
      <span>
        <div className="vehicle-info-badges">
          <Badge pill variant="dark">
            {`${fuelType[0].toUpperCase()}${fuelType.slice(1)}`}
          </Badge>{" "}
          <Badge pill variant="dark">
            {`${transmission[0].toUpperCase()}${transmission.slice(1)}`}
          </Badge>
        </div>
        <p className="vehicle-title">{`${brand} ${model}`}</p>
      </span>
    </Card>
  );
}
