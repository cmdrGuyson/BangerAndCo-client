import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { addVehicle } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

//Import consts
import {
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  VEHICLE_TYPES,
} from "../../utils/consts";

function AddVehicleModal(props) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [rent, setRent] = useState(0);
  const [type, setType] = useState(VEHICLE_TYPES[0].id);
  const [fuelType, setFuelType] = useState(FUEL_TYPES[0].id);
  const [transmission, setTransmission] = useState(TRANSMISSION_TYPES[0].id);
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleAddVehicle = async (event) => {
    event.preventDefault();
    const data = {
      brand,
      model,
      vehicleNumber,
      rent,
      type,
      fuelType,
      transmission,
    };
    //Add vehicle to backend
    let result = await props.addVehicle(data);

    //If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      clearFields();
    }
  };

  //Method to clear all form fields and set them to default
  const clearFields = () => {
    setBrand("");
    setModel("");
    setVehicleNumber("");
    setRent("");
    setType(VEHICLE_TYPES[0].id);
    setFuelType(FUEL_TYPES[0].id);
    setTransmission(TRANSMISSION_TYPES[0].id);
    props.clearErrors();
  };

  const newProps = { ...props };

  // Dropdown select for vehicle types
  const typeDropdownMarkup = VEHICLE_TYPES.map((type, index) => (
    <option key={index} value={type.id}>
      {type.name}
    </option>
  ));

  // Dropdown for fuel types
  const fuelDropdownMarkup = FUEL_TYPES.map((type, index) => (
    <option key={index} value={type.id}>
      {type.name}
    </option>
  ));

  // Dropdown for transmission types
  const transmissionDropdownMarkup = TRANSMISSION_TYPES.map((type, index) => (
    <option key={index} value={type.id}>
      {type.name}
    </option>
  ));

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.addVehicle;
  delete newProps.clearErrors;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={clearFields}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddVehicle}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Brand </Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Model </Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={9}>
              <Form.Label> Vehicle Number </Form.Label>
              <Form.Control
                type="text"
                className={errors.vehicleNumber ? "is-invalid" : null}
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
              <p className="error-text" hidden={!errors.vehicleNumber}>
                {errors.vehicleNumber}
              </p>
            </Form.Group>
            <Form.Group as={Col} md={3}>
              <Form.Label> Rent </Form.Label>
              <Form.Control
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label> Type </Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {typeDropdownMarkup}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Fuel Type </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setFuelType(e.target.value)}
                value={fuelType}
              >
                {fuelDropdownMarkup}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label> Transmission </Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setTransmission(e.target.value)}
                value={transmission}
              >
                {transmissionDropdownMarkup}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
            <span>
              <i className="fas fa-plus-square fa-plus-square-add"></i>
              {loading ? "Adding vehicle..." : "Add Vehicle"}
            </span>
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

AddVehicleModal.propTypes = {
  addVehicle: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addVehicle,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(AddVehicleModal);
