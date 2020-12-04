import React from "react";
import {
  Card,
  Alert,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./viewVehicle.scss";

//REDUX
import { connect } from "react-redux";

function ViewVehicle(props) {
  const {
    UI: { loading },
    vehicle,
  } = props;

  return loading ? (
    <p>Loading...</p>
  ) : vehicle ? (
    <Card className="view-user-card">
      <Badge
        pill
        className="vehicle-card-badge"
        variant={vehicle.isAvailable ? "success" : "danger"}
      >
        {vehicle.isAvailable ? "Available" : "Unavailable"}
      </Badge>
      <Card.Body>
        <img className="vehicle-image" src={vehicle.imageURL} alt="car"></img>

        <hr />

        <ListGroup>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Vehicle number</Badge>
            <span> {vehicle.vehicleNumber}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Brand</Badge>
            <span> {vehicle.brand}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Model</Badge>
            <span> {vehicle.model}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Type</Badge>
            <span> {vehicle.type}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Fuel type</Badge>
            <span> {vehicle.fuelType}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Transmission</Badge>
            <span> {vehicle.transmission}</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="danger">Rent</Badge>
            <span> {`$${vehicle.rent}`}</span>
          </ListGroup.Item>
        </ListGroup>

        <ButtonGroup vertical className="view-vehicle-image-options">
          <Button variant="outline-info">Change Rent</Button>
          <Button variant="outline-info">Change Image</Button>
          <Button variant="outline-danger">Remove Vehicle</Button>
        </ButtonGroup>
      </Card.Body>

      <Card.Footer>
        {" "}
        <small className="text-muted">
          {/* {`Registered on ${dayjs(user.createdAt).toString()}`} */}
        </small>
      </Card.Footer>
    </Card>
  ) : (
    <Alert variant="warning">No vehicle selected</Alert>
  );
}

ViewVehicle.propTypes = {
  vehicle: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.data.vehicle,
  UI: state.UI,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(ViewVehicle);
