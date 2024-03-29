import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./rent_now.scss";

//REDUX
import { connect } from "react-redux";
import { setTimes } from "../../redux/actions/dataActions";

function Rent_now(props) {
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  useEffect(() => {
    if (props.times) {
      setPickupDate(props.times.pickupDate);
      setPickupTime(props.times.pickupTime);
      setDropoffDate(props.times.dropoffDate);
      setDropoffTime(props.times.dropoffTime);
    }
  }, []);

  //Create the minimum pickup and delivery date
  const minDate = () => {
    const now = dayjs();

    return now.add(1, "day").format("YYYY-MM-DD");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { pickupDate, pickupTime, dropoffDate, dropoffTime };
    props.setTimes(data, props.history);
  };

  return (
    <div className="box">
      <form onSubmit={handleFormSubmit}>
        <Row>
          <Col>
            <p>Pickup Date and Time</p>
            <input
              className="rent-now-input"
              type="date"
              required
              value={pickupDate}
              min={minDate()}
              onChange={(e) => setPickupDate(e.target.value)}
            ></input>
            <input
              className="rent-now-input"
              type="time"
              min="08:00"
              max="18:00"
              required
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            ></input>
          </Col>
          <Col>
            <p>Dropoff Date and Time</p>
            <input
              className="rent-now-input"
              type="date"
              required
              min={minDate()}
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            ></input>
            <input
              className="rent-now-input"
              type="time"
              min="08:00"
              max="18:00"
              required
              value={dropoffTime}
              onChange={(e) => setDropoffTime(e.target.value)}
            ></input>
          </Col>
          <Col className="col-button">
            <Button variant="primary" className="search-button" type="submit">
              Search
            </Button>
          </Col>
        </Row>
        <p className="error-text-rent" hidden={!errors}>
          {errors.message}
        </p>
      </form>
    </div>
  );
}

Rent_now.propTypes = {
  setTimes: PropTypes.func.isRequired,
  times: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  times: state.data.times,
  UI: state.UI,
});

const mapActionsToProps = {
  setTimes,
};

export default connect(mapStateToProps, mapActionsToProps)(Rent_now);
