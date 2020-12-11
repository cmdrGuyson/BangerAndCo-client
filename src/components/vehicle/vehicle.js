import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./vehicle.scss";

//Images
import petrolIcon from "../../images/gas-station.svg";
import dieselIcon from "../../images/oil.svg";
import hybridIcon from "../../images/eco-car.svg";
import electricIcon from "../../images/electric-plug.svg";
import autoIcon from "../../images/automatic-transmission.svg";
import manualIcon from "../../images/manual-transmission.svg";

//REDUX
import { connect } from "react-redux";
import { getVehicle } from "../../redux/actions/dataActions";

function Vehicle(props) {
  const {
    _id,
    imageURL,
    model,
    brand,
    rent,
    fuelType,
    transmission,
  } = props.vehicle;

  const handleSetVehicle = (id) => {
    props.getVehicle(id);
  };

  return (
    <Card
      className="vehicle-box"
      key={_id}
      onClick={() => handleSetVehicle(_id)}
    >
      <div className="vehicle-ribbon">
        <span>{`$${rent}`}</span>
      </div>
      <Card.Img className="vehicle-image" src={imageURL}></Card.Img>
      <span>
        <p>
          {`${brand} ${model}`}
          <img
            src={
              fuelType === "petrol"
                ? petrolIcon
                : fuelType === "diesel"
                ? dieselIcon
                : fuelType === "hybrid"
                ? hybridIcon
                : electricIcon
            }
            alt="fuel"
            className="vehicle-icon"
            title={
              fuelType === "petrol"
                ? "Petrol"
                : fuelType === "diesel"
                ? "Diesel"
                : fuelType === "hybrid"
                ? "Hybrid"
                : "Electric"
            }
          />
          <img
            src={transmission === "auto" ? autoIcon : manualIcon}
            alt="transmission"
            className="vehicle-icon"
            title={
              transmission === "auto"
                ? "Automatic Transmission"
                : "Manual Transmission"
            }
          />
        </p>
      </span>
    </Card>
  );
}

Vehicle.propTypes = {
  getVehicle: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getVehicle,
};

export default connect(null, mapActionsToProps)(Vehicle);
