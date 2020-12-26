//MODULE IMPORT
import React, { useState, useEffect } from "react";
import {
  Container,
  CardColumns,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
  Button,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
//CSS IMPORT
import "./vehicles.scss";
//COMPONENT IMPORT
import RentNow from "../../components/rent_now/rent_now";
import Navbar from "../../components/navbar/navbar";
import Vehicle from "../../components/vehicle/vehicle";
import RentVehicleModal from "../../components/rentVehicle/rentVehicleModal";

//REDUX
import { connect } from "react-redux";
import { getVehicle } from "../../redux/actions/dataActions";

function Vehicles(props) {
  const [_vehicles, setVehicles] = useState([]);
  const [vehiclePool, setVehiclePool] = useState([]);
  const [transmission, setTransmission] = useState("Transmission");
  const [fuel, setFuel] = useState("Fuel Type");
  const [type, setType] = useState("Vehicle Type");
  const [vehicleModalShow, setVehicleModalShow] = React.useState(false);

  const {
    data: { vehicles, loading },
  } = props;

  useEffect(() => {
    if (vehicles) {
      setVehicles(vehicles);
      setVehiclePool(vehicles);
    }
  }, [vehicles]);

  const handleVehicleClick = (id) => {
    setVehicleModalShow(true);
    if (props.isVerified) {
      props.getVehicle(id);
    }
  };

  let vehiclesMarkup =
    _vehicles.length > 0 &&
    _vehicles.map((vehicle) => (
      <div key={vehicle._id} onClick={() => handleVehicleClick(vehicle._id)}>
        <Vehicle vehicle={vehicle}></Vehicle>
      </div>
    ));

  const search = (input) => {
    if (vehicles.length > 0) {
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
    }
  };

  const setValue = (type, name, value) => {
    if (vehicles.length > 0) {
      handleReset();

      if (type === "transmission") setTransmission(name);
      else if (type === "fuelType") setFuel(name);
      else if (type === "type") setType(name);

      const vehiclesCopy = vehicles.map((vehicle) => vehicle);
      const result = vehiclesCopy.filter((item) => {
        return item[type] === value;
      });

      setVehicles(result);
      setVehiclePool(result);
    }
  };

  const handleReset = () => {
    //Reset dropdown text
    setTransmission("Transmission");
    setFuel("Fuel Type");
    setType("Vehicle Type");

    //Reset state
    setVehicles(vehicles);
    setVehiclePool(vehicles);
  };

  return (
    <div className="top_image-vehicles">
      <Navbar />
      <Container style={{ textAlign: "center" }}>
        {/* Alert message to be shown if user has not yet uploaded ID images */}
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={
            !props.authenticated ||
            props.role === "admin" ||
            (props.licenseImageURL && props.alternateIDImageURL)
          }
        >
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImages">
            Click here to <b>upload verification images</b>
          </a>
        </Alert>
        <h2 className="title">Rent Vehicles</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>

        <RentNow history={props.history} />

        <Row className="vehicle-search">
          <Col md={5} style={{ paddingRight: 0 }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search vehicle"
                aria-label="Search vehicle"
                aria-describedby="basic-addon2"
                onChange={(e) => search(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col style={{ paddingRight: 0 }}>
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
                  onSelect={() => setValue("transmission", "Auto", "auto")}
                >
                  Auto
                </Dropdown.Item>
                <Dropdown.Item
                  value="manual"
                  onSelect={() => setValue("transmission", "Manual", "manual")}
                >
                  Manual
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col style={{ paddingRight: 0 }}>
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
                  onSelect={() => setValue("fuelType", "Diesel", "diesel")}
                >
                  Diesel
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => setValue("fuelType", "Petrol", "petrol")}
                >
                  Petrol
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => setValue("fuelType", "Hybrid", "hybrid")}
                >
                  Hybrid
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col style={{ paddingRight: 0 }}>
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
                  onSelect={() => setValue("type", "Town-Car", "town-car")}
                >
                  Town-Car
                </Dropdown.Item>
                <Dropdown.Item
                  onSelect={() => setValue("type", "Hatchback", "hatchback")}
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
                <Dropdown.Item onSelect={() => setValue("type", "Van", "van")}>
                  Van
                </Dropdown.Item>
                <Dropdown.Item onSelect={() => setValue("type", "SUV", "suv")}>
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
          <Col>
            <Button
              variant="outline-danger"
              style={{ width: "100%" }}
              onClick={handleReset}
            >
              <span>
                <i className="fas fa-times reset-icon"></i>
              </span>
              Reset
            </Button>
          </Col>
        </Row>
        {!loading &&
          (_vehicles.length === 0 || Object.keys(_vehicles).length === 0) && (
            <Alert variant="warning" className="no-vehicle-alert">
              No vehicles found! Try changing the pickup and dropoff dates.
            </Alert>
          )}
        <CardColumns style={{ marginTop: 20 }}>
          {!loading && _vehicles.length > 0 && vehiclesMarkup}
        </CardColumns>
      </Container>
      <RentVehicleModal
        history={props.history}
        isVerified={props.isVerified}
        show={vehicleModalShow}
        onHide={() => setVehicleModalShow(false)}
      />
    </div>
  );
}

Vehicles.propTypes = {
  getVehicle: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
  firstName: state.user.firstName,
  isVerified: state.user.isVerified,
  licenseImageURL: state.user.licenseImageURL,
  alternateIDImageURL: state.user.alternateIDImageURL,
  authenticated: state.user.authenticated,
  role: state.user.role,
  getVehicle: PropTypes.func.isRequired,
  vehicles: state.data.vehicles,
});

const mapActionsToProps = {
  getVehicle,
};

export default connect(mapStateToProps, mapActionsToProps)(Vehicles);
