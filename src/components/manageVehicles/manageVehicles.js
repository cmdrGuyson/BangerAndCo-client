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
	const [fuel, setFuel] = useState("Fuel");
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

	const setValue = (type, value) => {
		if (type === "transmission") setTransmission(value);
		else if (type === "fuel") setFuel(value);
		else if (type === "type") setType(value);
		else if (type === "available") setAvailability(value);
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
												onSelect={() => setValue("transmission", "Auto")}
											>
												Auto
											</Dropdown.Item>
											<Dropdown.Item
												value="manual"
												onSelect={() => setValue("transmission", "Manual")}
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
												onSelect={() => setValue("fuel", "Diesel")}
											>
												Diesel
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("fuel", "Petrol")}
											>
												Petrol
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
												onSelect={() => setValue("type", "Town-Car")}
											>
												Town-Car
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("type", "Hatchback")}
											>
												Hatchback
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("type", "Family-Saloon")}
												value=""
											>
												Family-Saloon
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("type", "Family-Estate")}
												value=""
											>
												Family-Estate
											</Dropdown.Item>
											<Dropdown.Item onSelect={() => setValue("type", "Van")}>
												Van
											</Dropdown.Item>
											<Dropdown.Item onSelect={() => setValue("type", "SUV")}>
												SUV
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("type", "Exotic")}
											>
												Exotic
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("type", "Sports")}
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
												onSelect={() => setValue("available", "Available")}
											>
												Available
											</Dropdown.Item>
											<Dropdown.Item
												onSelect={() => setValue("available", "Unavailable")}
											>
												Unavailable
											</Dropdown.Item>
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
