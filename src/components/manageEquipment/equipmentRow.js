import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import {
  incrementEquipment,
  decrementEquipment,
} from "../../redux/actions/dataActions";

function EquipmentRow(props) {
  const [name, setName] = useState("");
  const [rent, setRent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [availableAmount, setAvailableAmount] = useState(0);
  const [rentedAmount, setRentedAmount] = useState(0);

  useEffect(() => {
    setName(props.equipment.name);
    setRent(props.equipment.rent);
    setTotalAmount(props.equipment.totalAmount);
    setAvailableAmount(props.equipment.availableAmount);
    setRentedAmount(props.equipment.rentedAmount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = () => {
    props.incrementEquipment(props.equipment._id);
    let total_value = totalAmount;
    let availableAmount_value = availableAmount;
    setTotalAmount(total_value + 1);
    setAvailableAmount(availableAmount_value + 1);
  };

  const handleDecrement = () => {
    if (availableAmount !== 0) {
      props.decrementEquipment(props.equipment._id);
      let total_value = totalAmount;
      let availableAmount_value = availableAmount;
      setTotalAmount(total_value - 1);
      setAvailableAmount(availableAmount_value - 1);
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{`$${rent}`}</td>
      <td>{availableAmount}</td>
      <td>{rentedAmount}</td>
      <td>
        <InputGroup>
          <span>
            <Button
              variant="danger"
              className="increment-button"
              disabled={availableAmount === 0}
              onClick={handleDecrement}
            >
              -
            </Button>
          </span>
          <FormControl
            value={totalAmount}
            style={{ textAlign: "center", width: 10 }}
            aria-label="Total"
            aria-describedby="basic-addon1"
            disabled
          />
          <span>
            <Button
              variant="success"
              className="increment-button"
              onClick={handleIncrement}
            >
              +
            </Button>
          </span>
        </InputGroup>
      </td>
    </tr>
  );
}

EquipmentRow.propTypes = {
  incrementEquipment: PropTypes.func.isRequired,
  decrementEquipment: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  incrementEquipment,
  decrementEquipment,
};

export default connect(null, mapActionsToProps)(EquipmentRow);