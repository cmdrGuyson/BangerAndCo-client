import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  CardColumns,
  Dropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

import VehicleCard from "./vehicleCard";
import AddVehicleModal from "./addVehicleModal";

//REDUX
import { connect } from "react-redux";
import { getAllVehicles } from "../../redux/actions/dataActions";

import "./manageVehicles.scss";

function ManageVehicles(props) {
  const [_vehicles, setVehicles] = useState([]);
  const [vehiclePool, setVehiclePool] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [transmission, setTransmission] = useState("Transmission");
  const [fuel, setFuel] = useState("Fuel Type");
  const [type, setType] = useState("Vehicle Type");
  const [available, setAvailability] = useState("Availability");

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

  const setValue = (type, name, value) => {
    handleReset();

    if (type === "transmission") setTransmission(name);
    else if (type === "fuelType") setFuel(name);
    else if (type === "type") setType(name);
    else if (type === "isAvailable") setAvailability(name);

    const vehiclesCopy = vehicles.map((vehicle) => vehicle);
    const result = vehiclesCopy.filter((item) => {
      return item[type] === value;
    });

    setVehicles(result);
    setVehiclePool(result);
  };

  const search = (input) => {
    const vehicleCopy = vehiclePool.map((vehicle) => vehicle);
    const inputs = input.toLowerCase().split(" ");
    const searchKeys = ["model", "brand", "vehicleNumber"];
    let vehiclesArray = [];
    if (inputs.length === 1 && inputs[0] === "") {
      vehiclesArray = vehicleCopy;
    } else {
      inputs.forEach((word) => {
        vehicleCopy.filter((item) => {
          // eslint-disable-next-line array-callback-return
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) vehiclesArray.push(item);
            }
          });
        });
      });
    }
    const result = [...new Set(vehiclesArray)];
    setVehicles(result);
  };

  const handleReset = () => {
    //Reset dropdown text
    setTransmission("Transmission");
    setFuel("Fuel Type");
    setAvailability("Availability");
    setType("Vehicle Type");

    //Reset state
    setVehicles(vehicles);
    setVehiclePool(vehicles);
  };

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
                  onChange={(e) => search(e.target.value)}
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
                      style={{ width: "100%" }}
                    >
                      {transmission}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("transmission", "Auto", "auto")
                        }
                      >
                        Auto
                      </Dropdown.Item>
                      <Dropdown.Item
                        value="manual"
                        onSelect={() =>
                          setValue("transmission", "Manual", "manual")
                        }
                      >
                        Manual
                      </Dropdown.Item>
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
                      {fuel}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("fuelType", "Diesel", "diesel")
                        }
                      >
                        Diesel
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("fuelType", "Petrol", "petrol")
                        }
                      >
                        Petrol
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("fuelType", "Hybrid", "hybrid")
                        }
                      >
                        Hybrid
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {type}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("type", "Town-Car", "town-car")
                        }
                      >
                        Town-Car
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("type", "Hatchback", "hatchback")
                        }
                      >
                        Hatchback
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("type", "Family-Saloon", "family-saloon")
                        }
                      >
                        Family-Saloon
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("type", "Family-Estate", "family-estate")
                        }
                      >
                        Family-Estate
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => setValue("type", "Van", "van")}
                      >
                        Van
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => setValue("type", "SUV", "suv")}
                      >
                        SUV
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => setValue("type", "Exotic", "exotic")}
                      >
                        Exotic
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => setValue("type", "Sports", "sports")}
                      >
                        Sports
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col style={{ padding: 0 }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      {available}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Available", true)
                        }
                      >
                        Available
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Unavailable", false)
                        }
                      >
                        Unavailable
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row>
                <Col xs={5}>
                  <Button
                    variant="outline-secondary"
                    className="reset-button"
                    onClick={handleReset}
                  >
                    <span>
                      <i className="fas fa-times reset-icon"></i>
                    </span>
                    Reset
                  </Button>
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
            <Button
              variant="info"
              className="vehicle-card-button"
              onClick={() => setAddModalShow(true)}
            >
              <span>
                <i className="fas fa-plus-square fa-plus-square-add"></i>
                Add Vehicle
              </span>
            </Button>
          </Card.Body>
        </Card>

        {loading ? <p>Loading...</p> : vehiclesMarkup}
      </CardColumns>
      <AddVehicleModal
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      />
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
