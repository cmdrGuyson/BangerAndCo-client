import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

//CSS
import "./rentVehicleModal.scss";

//REDUX
import { connect } from "react-redux";
import { getEquipment, makeRent } from "../../redux/actions/dataActions";

//Utils
import { isOver25 } from "../../utils/util";

function RentVehicleModal(props) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.rent_errors ? setErrors(props.UI.rent_errors) : setErrors({});
  }, [props.UI.rent_errors]);

  //Destructure props
  const {
    data: { vehicle, loading, times, equipment },
    user,
  } = props;

  useEffect(() => {
    props.getEquipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Calculate initial total
  useEffect(() => {
    if (vehicle) {
      let rent = vehicle.rent;
      let minutesRented = times.diff;
      if (minutesRented <= 300) {
        setTotal(rent / 2);
      } else if (minutesRented <= 1440) {
        setTotal(rent);
      } else {
        let daysRented = Math.floor(minutesRented / 60 / 24);
        let remainingMins = minutesRented - daysRented * 60 * 24;
        if (remainingMins === 0) setTotal(rent * daysRented);
        else if (remainingMins <= 300) setTotal(rent * daysRented + rent / 2);
        else setTotal((daysRented + 1) * rent);
      }
    }
  }, [vehicle]);

  const addEquipment = (e) => {
    let _selectedEquipment = [...selectedEquipment];

    const obj = equipment.find((obj) => {
      return obj._id === e.target.value;
    });

    //Calculate amount for rent period
    let rentAmount = 0;
    let rent = obj.rent;
    let minutesRented = times.diff;
    console.log(minutesRented);
    if (minutesRented <= 300) {
      rentAmount = rent / 2;
    } else if (minutesRented <= 1440) {
      rentAmount = rent;
    } else {
      let daysRented = Math.floor(minutesRented / 60 / 24);
      let remainingMins = minutesRented - daysRented * 60 * 24;
      if (remainingMins === 0) rentAmount = rent * daysRented;
      else if (remainingMins <= 300) rentAmount = rent * daysRented + rent / 2;
      else rentAmount = (daysRented + 1) * rent;
    }

    let _total = total;

    if (_selectedEquipment.includes(e.target.value)) {
      _selectedEquipment.splice(_selectedEquipment.indexOf(e.target.value), 1);

      _total -= rentAmount;
    } else {
      _selectedEquipment.push(e.target.value);
      _total += rentAmount;
    }
    setTotal(_total);
    setSelectedEquipment(_selectedEquipment);
  };

  const handleMakeRent = async (event) => {
    event.preventDefault();
    const data = {
      pickupDate: times.pickupDate,
      pickupTime: times.pickupTime,
      dropoffDate: times.dropoffDate,
      dropoffTime: times.dropoffTime,
      additionalEquipment: selectedEquipment,
    };
    //Make the rent
    let result = await props.makeRent(data, vehicle._id, props.history);

    //If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
    }
  };

  const newProps = { ...props };

  const equipmentMarkup = equipment.map((e) => (
    <Fragment key={e._id}>
      <li>
        <input
          type="checkbox"
          id={e._id}
          value={e._id}
          onInput={addEquipment}
        />
        <label htmlFor={e._id}>
          {e.name} - ${e.rent}/day
        </label>
      </li>
      <br />
    </Fragment>
  ));

  //Remove unwanted props before passing props to modal
  delete newProps.isVerified;
  delete newProps.getEquipment;
  delete newProps.UI;
  delete newProps.history;
  delete newProps.makeRent;

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
              <img
                className="vehicle-image"
                src={vehicle.imageURL}
                alt="vehicle"
              />
              <Table striped bordered hover>
                <tbody className="rent-vehicle-table">
                  <tr>
                    <td>Rent per day</td>
                    <td>{`$${vehicle.rent}`}</td>
                  </tr>
                  <tr>
                    <td>Rent period</td>
                    <td>{`${times.pickupDate} (${times.pickupTime}) to ${times.dropoffDate} (${times.dropoffTime})`}</td>
                  </tr>
                  <tr>
                    <td>Additional Equipment</td>
                    <td>
                      <ul className="ks-cboxtags">
                        {!loading && equipmentMarkup}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Insuarance</td>
                    <td>
                      {isOver25(user.dateOfBirth) ? (
                        <Badge
                          pill
                          variant="success"
                          className="available-badge"
                        >
                          Available
                        </Badge>
                      ) : (
                        <Badge
                          pill
                          variant="danger"
                          className="available-badge"
                        >
                          Not Available
                        </Badge>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total</b>
                    </td>
                    <td>
                      <b>${total}</b>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <p
                className="error-text"
                style={{ textAlign: "center" }}
                hidden={!errors}
              >
                {errors.error}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          {props.isVerified === true && vehicle && (
            <Button variant="primary" onClick={handleMakeRent}>
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
  times: PropTypes.object,
  user: PropTypes.object,
  getEquipment: PropTypes.func.isRequired,
  makeRent: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  getEquipment,
  makeRent,
};

const mapStateToProps = (state) => ({
  data: state.data,
  times: state.data.times,
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsToProps)(RentVehicleModal);
