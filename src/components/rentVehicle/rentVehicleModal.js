import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
// import { connect } from "react-redux";
// import { getVehicle } from "../../redux/actions/dataActions";

export default function RentVehicleModal(props) {
  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.isVerified;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.isVerified === false
            ? "You are not verified!"
            : props.isVerified === true
            ? "Vehicle name"
            : "Not logged in"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.isVerified === false
            ? "Please wait while an administrator verifies your account. Please upload verification images if you haven't already"
            : !props.isVerified && "Please login to rent vehicle!"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        {props.isVerified === false ? (
          <Button variant="info" href="/uploadImages">
            Upload Images
          </Button>
        ) : (
          !props.isVerified && (
            <Button variant="info" href="/login">
              Login
            </Button>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
}

RentVehicleModal.propTypes = {
  isVerified: PropTypes.bool,
};

// const mapActionsToProps = {
//   getVehicle,
// };

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

// export default connect(mapStateToProps, mapActionsToProps)(RentVehicleModal);
