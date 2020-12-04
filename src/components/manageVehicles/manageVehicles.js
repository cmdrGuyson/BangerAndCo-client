import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  CardColumns,
  Badge,
  Dropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

import VehicleCard from "./vehicleCard";

//REDUX
import { connect } from "react-redux";
import { getAllVehicles } from "../../redux/actions/dataActions";

import "./manageVehicles.scss";

function ManageVehicles(props) {
  const [_vehicles, setVehicles] = useState([]);
  const [vehiclePool, setVehiclePool] = useState([]);

  const {
    data: { vehicles, loading },
  } = props;

  useEffect(() => {
    props.getAllVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (vehicles) {
      setVehicles(vehicles);
      setVehiclePool(vehicles);
    }
  }, [vehicles]);

  let vehiclesMarkup = _vehicles.map((vehicle) => (
    <VehicleCard key={vehicle._id} vehicle={vehicle} />
  ));

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search Vehicles</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search by name"
                  aria-label="Search by name"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                    >
                      Transmission
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Auto</Dropdown.Item>
                      <Dropdown.Item>Manual</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col style={{ padding: 0 }}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      Fuel
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Diesel</Dropdown.Item>
                      <Dropdown.Item>Petrol</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                    >
                      Vehicle Type
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Diesel</Dropdown.Item>
                      <Dropdown.Item>Petrol</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col style={{ padding: 0 }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      Availability
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Available</Dropdown.Item>
                      <Dropdown.Item>Unavailable</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <CardColumns>
        <Card className="vehicle-card">
          <Card.Img
            variant="top"
            src="http://localhost:5000/vehicles/default_car.jpg"
          />
          <Card.Body>
            <Button variant="info" className="vehicle-card-button">
              <span>
                <i className="fas fa-plus-square fa-plus-square-add"></i>
                Add Vehicle
              </span>
            </Button>
          </Card.Body>
        </Card>

        {loading ? <p>Loading...</p> : vehiclesMarkup}
      </CardColumns>
    </div>
  );
}

ManageVehicles.propTypes = {
  getAllVehicles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllVehicles,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageVehicles);
