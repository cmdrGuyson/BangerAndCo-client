//MODULE IMPORT
import React, { useState, useEffect } from "react";
import { Container, CardColumns, Card } from "react-bootstrap";
import PropTypes from "prop-types";
//CSS IMPORT
import "./vehicles.scss";
//COMPONENT IMPORT
import RentNow from "../../components/rent_now/rent_now";
import Navbar from "../../components/navbar/navbar";
import Vehicle from "../../components/vehicle/vehicle";

//REDUX
import { connect } from "react-redux";
import { getAllAvailableVehicles } from "../../redux/actions/dataActions";

function Vehicles(props) {
  const [_vehicles, setVehicles] = useState([]);
  const [vehiclePool, setVehiclePool] = useState([]);

  const {
    data: { vehicles, loading },
  } = props;

  useEffect(() => {
    props.getAllAvailableVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (vehicles) {
      setVehicles(vehicles);
      setVehiclePool(vehicles);
    }
  }, [vehicles]);

  let vehiclesMarkup = _vehicles.map((vehicle) => (
    <Vehicle key={vehicle._id} vehicle={vehicle}></Vehicle>
  ));

  return (
    <div className="top_image-vehicles">
      <Navbar />
      <Container style={{ textAlign: "center" }}>
        <h2 className="title">All Vehicles</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>

        <RentNow />
        <CardColumns style={{ marginTop: 200 }}>
          {!loading && vehiclesMarkup}
        </CardColumns>
      </Container>
    </div>
  );
}

Vehicles.propTypes = {
  getAllAvailableVehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllAvailableVehicles,
};

export default connect(mapStateToProps, mapActionsToProps)(Vehicles);
