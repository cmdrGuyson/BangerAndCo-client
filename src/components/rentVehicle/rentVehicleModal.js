import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

//CSS
import "./rentVehicleModal.scss";

//REDUX
import { connect } from "react-redux";
// import { getVehicle } from "../../redux/actions/dataActions";

//Components
import Vehicle from "../vehicle/vehicle";

function RentVehicleModal(props) {
  //Destructure props
  const {
    data: { vehicle, loading },
  } = props;

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.isVerified;

  return (
    !loading && (
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rent-vehicle-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.isVerified === false
              ? "You are not verified!"
              : props.isVerified === true && vehicle
              ? `${vehicle.brand} ${vehicle.model}`
              : "Not logged in"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.isVerified === false
              ? "Please wait while an administrator verifies your account. Please upload verification images if you haven't already"
              : !props.isVerified && "Please login to rent vehicle!"}
          </p>

          {/* If user is verified and data is loaded */}
          {props.isVerified === true && vehicle && (
            <div className="rent-vehicle-body">
              <img className="vehicle-image" src={vehicle.imageURL} />
              <Table striped bordered hover>
                <tbody className="rent-vehicle-table">
                  <tr>
                    <td>Rent per day</td>
                    <td>{`$${vehicle.rent}`}</td>
                  </tr>
                  <tr>
                    <td>Rent period</td>
                    <td>17th December - 19th December</td>
                  </tr>
                  <tr>
                    <td>Additional Equipment</td>
                    <td>
                      <ul className="ks-cboxtags">
                        <li>
                          <input
                            type="checkbox"
                            id="checkboxOne"
                            value="Rainbow Dash"
                          />
                          <label htmlFor="checkboxOne">Baby Seat $10</label>
                        </li>
                        <br />
                        <li>
                          <input
                            type="checkbox"
                            id="checkboxTwo"
                            value="Cotton Candy"
                          />
                          <label htmlFor="checkboxTwo">Wine Chiller $20</label>
                        </li>
                        <br />
                        <li>
                          <input
                            type="checkbox"
                            id="checkboxThree"
                            value="Rarity"
                          />
                          <label htmlFor="checkboxThree">SatNav $15</label>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Insuarance</td>
                    <td>
                      <Badge pill variant="success" className="available-badge">
                        Available
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>$690.00</b>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          {props.isVerified === true && vehicle && (
            <Button variant="primary" onClick={props.onHide}>
              Rent Vehicle
            </Button>
          )}
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
    )
  );
}

RentVehicleModal.propTypes = {
  vehicle: PropTypes.object,
};

const mapActionsToProps = {
  //getVehicle,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, mapActionsToProps)(RentVehicleModal);
