import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { removeVehicle } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

function RemoveVehicleModal(props) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleRemove = async (event) => {
    event.preventDefault();
    let result = await props.removeVehicle(props.id);
    if (result === true) props.onHide();
  };

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.removeVehicle;
  delete newProps.id;
  delete newProps.clearErrors;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={() => props.clearErrors()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Remove Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this vehicle?</p>
        <p className="error-text" hidden={!errors.vehicle}>
          Cannot delete vehicle
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleRemove} disabled={loading}>
          Remove Vehicle
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RemoveVehicleModal.propTypes = {
  removeVehicle: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  removeVehicle,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveVehicleModal);
