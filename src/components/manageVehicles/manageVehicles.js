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

//COMPONENTS
import VehicleCard from "./vehicleCard";
import AddVehicleModal from "./addVehicleModal";

//REDUX
import { connect } from "react-redux";
import { getAllVehicles } from "../../redux/actions/dataActions";

//CSS
import "./manageVehicles.scss";

//Import consts
import {
  FUEL_TYPES,
  TRANSMISSION_TYPES,
  VEHICLE_TYPES,
} from "../../utils/consts";

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

  //When component is initiated, get all vehicles from the backend
  useEffect(() => {
    props.getAllVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //When vehicles list passed from props are updated, update state variables
  useEffect(() => {
    if (vehicles) {
      setVehicles(vehicles);
      setVehiclePool(vehicles);
    }
  }, [vehicles]);

  //Function to create listof vehicle cards from vehicle list in state
  let vehiclesMarkup = _vehicles.map((vehicle) => (
    <VehicleCard key={vehicle._id} vehicle={vehicle} />
  ));

  //Function to change displayed vehicles when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "transmission") setTransmission(name);
    else if (type === "fuelType") setFuel(name);
    else if (type === "type") setType(name);
    else if (type === "isAvailable") setAvailability(name);

    //Filter vehicle list
    const vehiclesCopy = vehicles.map((vehicle) => vehicle);
    const result = vehiclesCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render vehicle cards
    setVehicles(result);
    setVehiclePool(result);
  };

  //Function to search through vehicles
  const search = (input) => {
    //Get a copy of state
    const vehicleCopy = vehiclePool.map((vehicle) => vehicle);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Vehicle model, brand and number will be searched through
    const searchKeys = ["model", "brand", "vehicleNumber"];
    let vehiclesArray = [];

    //If search criteria is null reset vehicles to display all vehicles
    if (inputs.length === 1 && inputs[0] === "") {
      vehiclesArray = vehicleCopy;
    }
    //If search criteria is entered
    else {
      //Filter through vehicle list to find matches
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

    //Remove duplicates and set state to be dispayed
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

  // Dropdown select for vehicle types
  const typeDropdownMarkup = VEHICLE_TYPES.map((type) => (
    <Dropdown.Item onSelect={() => setValue("type", type.name, type.id)}>
      {type.name}
    </Dropdown.Item>
  ));

  // Dropdown for fuel types
  const fuelDropdownMarkup = FUEL_TYPES.map((type) => (
    <Dropdown.Item onSelect={() => setValue("fuelType", type.name, type.id)}>
      {type.name}
    </Dropdown.Item>
  ));

  // Dropdown for transmission types
  const transmissionDropdownMarkup = TRANSMISSION_TYPES.map((type) => (
    <Dropdown.Item
      onSelect={() => setValue("transmission", type.name, type.id)}
    >
      {type.name}
    </Dropdown.Item>
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
                    <Dropdown.Menu>{transmissionDropdownMarkup}</Dropdown.Menu>
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
                    <Dropdown.Menu>{fuelDropdownMarkup}</Dropdown.Menu>
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
                    <Dropdown.Menu>{typeDropdownMarkup}</Dropdown.Menu>
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
      <Row>
        <Col lg={4}>
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
        </Col>
        {loading ? (
          <p>Loading...</p>
        ) : (
          vehiclesMarkup.map((card) => (
            <Col lg={4} md={4} sm={4}>
              {" "}
              {card}{" "}
            </Col>
          ))
        )}
      </Row>
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
