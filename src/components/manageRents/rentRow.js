import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";
import { changeRentStatus } from "../../redux/actions/dataActions";
import { getAllRents } from "../../redux/actions/dataActions";

function RentRow(props) {
  const [status, setStatus] = useState("pending");
  const [rent, setRent] = useState(null);

  useEffect(() => {
    if (rent) setStatus(rent.status);
  }, []);

  useEffect(() => {
    if (props.rent) {
      setRent(props.rent);
      setStatus(props.rent.status);
    }
  }, [props.rent]);

  const { onView } = props;

  const handleChangeStatus = (status) => {
    props.changeRentStatus(rent._id, status);
    setStatus(status);
    //props.getAllRents();
  };

  let statusMarkup =
    status === "pending" ? (
      <Badge pill variant="secondary">
        Pending Collection
      </Badge>
    ) : status === "collected" ? (
      <Badge pill variant="warning">
        Collected
      </Badge>
    ) : (
      <Badge pill variant="success">
        Returned
      </Badge>
    );

  let actionMarkup =
    status === "pending" ? (
      <Button
        variant="outline-info"
        size="sm"
        onClick={() => handleChangeStatus("collected")}
      >
        Set Collected
      </Button>
    ) : status === "collected" ? (
      <Button
        variant="outline-success"
        size="sm"
        onClick={() => handleChangeStatus("returned")}
      >
        Set Returned
      </Button>
    ) : null;

  return (
    <>
      {rent && (
        <tr>
          <td>{rent.vehicle.vehicleNumber}</td>
          <td>
            {rent.vehicle.brand} {rent.vehicle.model}
          </td>
          <td>
            {dayjs(rent.rentedFrom)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            {dayjs(rent.rentedTo)
              .format("DD/MM/YYYY", {
                timeZone: "Asia/Colombo",
              })
              .toString()}
          </td>
          <td>
            {rent.user.firstName} {rent.user.lastName}
          </td>
          <td>${rent.total}</td>
          <td>{statusMarkup}</td>
          <td>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ marginRight: 5 }}
              onClick={() => onView(rent)}
            >
              View
            </Button>
            {actionMarkup}
          </td>
        </tr>
      )}
    </>
  );
}

RentRow.propTypes = {
  rent: PropTypes.object.isRequired,
  changeRentStatus: PropTypes.func.isRequired,
};

const mapActionsToProps = { changeRentStatus, getAllRents };

export default connect(null, mapActionsToProps)(RentRow);
