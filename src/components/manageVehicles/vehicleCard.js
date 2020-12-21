import React from "react";
import { Badge, Card } from "react-bootstrap";
import PropTypes from "prop-types";

//CSS
import "./vehicleCard.scss";

//REDUX
import { connect } from "react-redux";
import { getVehicle } from "../../redux/actions/dataActions";

function VehicleCard(props) {
  const {
    _id,
    vehicleNumber,
    isAvailable,
    imageURL,
    model,
    brand,
  } = props.vehicle;

  const handleSetVehicle = (id) => {
    props.getVehicle(id);
  };

  return (
    <Card className="vehicle-card" onClick={() => handleSetVehicle(_id)}>
      <Card.Img variant="top" src={imageURL} className="vehicle-card-image" />
      <Badge
        pill
        className="vehicle-card-badge"
        variant={isAvailable ? "success" : "danger"}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Badge>
      <Card.Body>
        <Badge variant="secondary">Number</Badge>
        <span>
          {"	"}
          {vehicleNumber}
        </span>
        <br />
        <Badge variant="secondary">Vehicle</Badge>
        <span>
          {"	"}
          {`${brand} ${model}`}
        </span>
      </Card.Body>
    </Card>
  );
}

VehicleCard.propTypes = {
  getVehicle: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getVehicle,
};

export default connect(null, mapActionsToProps)(VehicleCard);
