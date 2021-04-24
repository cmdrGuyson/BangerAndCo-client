import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./viewRentModal.scss";

//REDUX
import { connect } from "react-redux";
import {
  getAvailableEquipment,
  changeRentEquipment,
} from "../../redux/actions/dataActions";

function ViewRentModal(props) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [_equipment, setEquipment] = useState([]);
  const [total, setTotal] = useState(0);
  const [edited, setEdited] = useState(false);

  const { rent, equipment, loading, UI, manage } = props;

  //When component loads
  useEffect(() => {
    setSelectedEquipment(rent.additionalEquipment);
    setTotal(rent.total);

    //Get available equipment using booking dates of rent
    if (rent.status === "pending") {
      let pickup = dayjs(rent.rentedFrom).format("YYYY-MM-DD").toString();
      let dropoff = dayjs(rent.rentedTo).format("YYYY-MM-DD").toString();
      props.getAvailableEquipment(pickup, dropoff);
    }
  }, []);

  //Make equipment list
  useEffect(() => {
    if (rent && equipment.length > 0) {
      let allEquipment = [...equipment, ...rent.additionalEquipment];
      setEquipment([
        ...new Map(allEquipment.map((item) => [item._id, item])).values(),
      ]);
    }
  }, [equipment, rent]);

  const newProps = { ...props };

  const equipmentViewMarkup = selectedEquipment.map((e) => (
    <li key={e._id}>{e.name}</li>
  ));

  //Add or remove an equipment
  const addEquipment = (e) => {
    setEdited(true);
    let _selectedEquipment = [...selectedEquipment];

    const obj = equipment.find((obj) => {
      return obj._id === e.target.value;
    });

    //Calculate amount for rent period
    let rentAmount = 0;
    let minutesRented = dayjs(rent.rentedTo).diff(
      dayjs(rent.rentedFrom),
      "minutes"
    );

    if (minutesRented <= 300) {
      rentAmount = obj.rent / 2;
    } else if (minutesRented <= 1440) {
      rentAmount = obj.rent;
    } else {
      let daysRented = Math.floor(minutesRented / 60 / 24);
      let remainingMins = minutesRented - daysRented * 60 * 24;
      if (remainingMins === 0) rentAmount = obj.rent * daysRented;
      else if (remainingMins <= 300)
        rentAmount = obj.rent * daysRented + obj.rent / 2;
      else rentAmount = (daysRented + 1) * obj.rent;
    }

    let _total = total;

    if (_selectedEquipment.some((item) => item._id === obj._id)) {
      _selectedEquipment.splice(
        _selectedEquipment.findIndex((item) => item._id === obj._id),
        1
      );

      _total -= rentAmount;
    } else {
      _selectedEquipment.push(obj);
      _total += rentAmount;
    }
    setTotal(_total);
    setSelectedEquipment(_selectedEquipment);
  };

  const equipmentAddMarkup = _equipment.map((e) => (
    <Fragment key={e._id}>
      <li>
        <input
          type="checkbox"
          defaultChecked={selectedEquipment.some((el) => el._id === e._id)}
          id={e._id}
          value={e._id}
          onClick={addEquipment}
        />
        <label htmlFor={e._id}>
          {e.name} - ${e.rent}/day
        </label>
      </li>
      <br />
    </Fragment>
  ));

  //Update equipment on rent object
  const handleEdit = async () => {
    let result = await props.changeRentEquipment(
      rent._id,
      selectedEquipment,
      total
    );
    if (result) setEdited(false);
  };

  //Remove unwanted props before passing props to modal
  delete newProps.rent;
  delete newProps.getAvailableEquipment;
  delete newProps.changeRentEquipment;
  delete newProps.loading;
  delete newProps.UI;
  delete newProps.manage;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rent-vehicle-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {rent.vehicle.brand} {rent.vehicle.model}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rent-vehicle-body">
          <img
            className="vehicle-image"
            src={rent.vehicle.imageURL}
            alt="vehicle"
          />
          <Table striped bordered hover>
            <tbody className="rent-vehicle-table">
              <tr>
                <td>Vehicle Number</td>
                <td>{rent.vehicle.vehicleNumber}</td>
              </tr>
              <tr>
                <td>Rented From</td>
                <td>
                  {dayjs(rent.rentedFrom)
                    .format("DD/MM/YYYY h:mm A", {
                      timeZone: "Asia/Colombo",
                    })
                    .toString()}
                </td>
              </tr>
              <tr>
                <td>Rented To</td>
                <td>
                  {dayjs(rent.rentedTo)
                    .format("DD/MM/YYYY h:mm A", {
                      timeZone: "Asia/Colombo",
                    })
                    .toString()}
                </td>
              </tr>
              <tr>
                <td>Additional Equipment</td>
                <td>
                  <p>
                    {(rent.status !== "pending" || manage) &&
                      (selectedEquipment.length > 0
                        ? equipmentViewMarkup
                        : "No Additional Equipment")}
                  </p>
                  {rent.status === "pending" && !manage && (
                    <>
                      {!loading && equipment.length === 0 && (
                        <p style={{ color: "gray" }}>
                          No available equipment to rent
                        </p>
                      )}
                      <ul className="ks-cboxtags">
                        {!loading && equipmentAddMarkup}
                      </ul>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>
                  {rent.isInsured ? (
                    <Badge pill variant="success" className="available-badge">
                      Available
                    </Badge>
                  ) : (
                    <Badge pill variant="danger" className="available-badge">
                      Not Available
                    </Badge>
                  )}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  {rent.status === "pending" ? (
                    <Badge pill variant="secondary" className="available-badge">
                      Pending Collection
                    </Badge>
                  ) : rent.status === "collected" ? (
                    <Badge pill variant="warning" className="available-badge">
                      Collected
                    </Badge>
                  ) : (
                    <Badge pill variant="success" className="available-badge">
                      Returned
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

          {/* <p
            className="error-text"
            style={{ textAlign: "center" }}
            hidden={!errors}
          >
            {errors.error}
          </p> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {edited && (
          <Button variant="primary" onClick={handleEdit} disabled={UI.loading}>
            Update Rent
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

ViewRentModal.propTypes = {
  rent: PropTypes.object.isRequired,
  equipment: PropTypes.array,
  loading: PropTypes.bool,
  UI: PropTypes.object.isRequired,
  getAvailableEquipment: PropTypes.func.isRequired,
  changeRentEquipment: PropTypes.func.isRequired,
  manage: PropTypes.bool,
};

const mapActionsToProps = {
  getAvailableEquipment,
  changeRentEquipment,
};

const mapStateToProps = (state) => ({
  equipment: state.data.equipment,
  loading: state.data.loading,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsToProps)(ViewRentModal);
