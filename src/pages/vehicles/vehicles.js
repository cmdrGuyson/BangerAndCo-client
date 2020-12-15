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
} from "react-bootstrap";
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
  const [transmission, setTransmission] = useState("Transmission");
  const [fuel, setFuel] = useState("Fuel Type");
  const [type, setType] = useState("Vehicle Type");

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

  const setValue = (type, name, value) => {
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
        <h2 className="title">All Vehicles</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>

        <RentNow />

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
        <CardColumns style={{ marginTop: 20 }}>
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
