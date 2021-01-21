import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./viewRentModal.scss";

//REDUX
import { connect } from "react-redux";
import { getAvailableEquipment } from "../../redux/actions/dataActions";

function ViewRentModal(props) {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [total, setTotal] = useState(0);

  const { rent } = props;

  useEffect(() => {
    setSelectedEquipment(rent.additionalEquipment);
    setTotal(rent.total);
  }, []);

  const newProps = { ...props };

  const equipmentViewMarkup = selectedEquipment.map((e) => (
    <li key={e._id}>{e.name}</li>
  ));

  //Remove unwanted props before passing props to modal
  delete newProps.rent;

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
                    {selectedEquipment.length > 0 ? (
                      equipmentViewMarkup
                    ) : (
                      <p>No Additional Equipment</p>
                    )}
                  </p>
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
      </Modal.Footer>
    </Modal>
  );
}

ViewRentModal.propTypes = {
  rent: PropTypes.object.isRequired,
  getAvailableEquipment: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getAvailableEquipment,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapActionsToProps)(ViewRentModal);
