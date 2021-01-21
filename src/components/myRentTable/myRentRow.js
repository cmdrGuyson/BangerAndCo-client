import React, { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//REDUX
import { connect } from "react-redux";

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
          </td>
        </tr>
      )}
    </>
  );
}

RentRow.propTypes = {
  rent: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

export default connect(null, mapActionsToProps)(RentRow);
