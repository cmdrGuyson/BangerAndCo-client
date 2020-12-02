import React, { useState, useEffect } from "react";
import {
	InputGroup,
	Card,
	Button,
	Col,
	Row,
	FormControl,
	CardColumns,
	Alert,
	Dropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

export default function manageVehicles() {
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
								<Col>
									<Dropdown>
										<Dropdown.Toggle
											variant="outline-secondary"
											id="dropdown-basic"
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
								<Col>
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
			{/* {_users.length > 0 ? (
        <CardColumns>{usersMarkup}</CardColumns>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Alert variant="warning">No users found!</Alert>
      )} */}
		</div>
	);
}
