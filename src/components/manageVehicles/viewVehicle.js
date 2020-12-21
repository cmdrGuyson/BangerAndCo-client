import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Alert,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import "./viewVehicle.scss";

import RemoveVehicleModal from "./removeVehicleModal";
import ChangeRentModal from "./changeRentModal";

//REDUX
import { connect } from "react-redux";
import { uploadVehicleImage } from "../../redux/actions/dataActions";

function ViewVehicle(props) {
  //Destructure props
  const {
    UI: { loading },
    vehicle,
  } = props;

  const [errors, setErrors] = useState({});
  const [removeModalShow, setRemoveModalShow] = useState(false);
  const [rentModalShow, setRentModalShow] = useState(false);

  //Clicks on hidden input field
  const handleImageUpload = () => {
    const fileInput = document.getElementById("vehicleImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadVehicleImage(formData, vehicle._id);
  };

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  return loading ? (
    <p>Loading...</p>
  ) : vehicle ? (
    <Fragment>
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
            <Button
              variant="outline-info"
              disabled={!vehicle.isAvailable}
              onClick={() => setRentModalShow(true)}
            >
              Change Rent
            </Button>
            <Button variant="outline-info" onClick={handleImageUpload}>
              Change Image
            </Button>
            <Button
              variant="outline-danger"
              disabled={!vehicle.isAvailable}
              onClick={() => setRemoveModalShow(true)}
            >
              Remove Vehicle
            </Button>
          </ButtonGroup>
        </Card.Body>

        <input
          type="file"
          id="vehicleImageInput"
          onChange={handleImageChange}
          hidden="hidden"
          accept=".png, .jpeg, .jpg"
        />

        <p
          className="error-text"
          hidden={!errors.vehicleImage}
          style={{ textAlign: "center" }}
        >
          {errors.vehicleImage}
        </p>

        <Card.Footer>
          {" "}
          <small className="text-muted">
            {`Added on ${dayjs(vehicle.createdAt).toString()}`}
          </small>
        </Card.Footer>
      </Card>

      <RemoveVehicleModal
        id={vehicle._id}
        show={removeModalShow}
        onHide={() => setRemoveModalShow(false)}
      />
      <ChangeRentModal
        id={vehicle._id}
        show={rentModalShow}
        onHide={() => setRentModalShow(false)}
      />
    </Fragment>
  ) : (
    <Alert variant="warning">No vehicle selected</Alert>
  );
}

ViewVehicle.propTypes = {
  vehicle: PropTypes.object,
  UI: PropTypes.object.isRequired,
  uploadVehicleImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  vehicle: state.data.vehicle,
  UI: state.UI,
});

const mapActionsToProps = { uploadVehicleImage };

export default connect(mapStateToProps, mapActionsToProps)(ViewVehicle);
