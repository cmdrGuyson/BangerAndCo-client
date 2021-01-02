import React, { useEffect, useState } from "react";
import {
	Table,
	Card,
	Row,
	Col,
	InputGroup,
	FormControl,
	Button,
	Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

//COMPONENTS
import RentRow from "./rentRow";

//CSS IMPORT
import "./manageRents.scss";

//REDUX
import { connect } from "react-redux";
import { getAllRents } from "../../redux/actions/dataActions";
import ViewRentModal from "../viewRent/viewRentModal";

function ManageRents(props) {
	const [modalShow, setModalShow] = useState(false);
	const [rent, setRentObject] = useState({});
	const [rentPool, setRentPool] = useState([]);

	const setRent = (rent) => {
		setRentObject(rent);
		setModalShow(true);
	};

	//Get rent information when component loads
	useEffect(() => {
		props.getAllRents();
		setRentPool(rents);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Destructure props
	const {
		data: { rents, loading },
	} = props;

	useEffect(() => {
		if (rents) {
			setRentPool(rents);
		}
	}, [rents]);

	const changeStatus = (_status) => {
		const allRents = rents.map((rent_obj) => rent_obj);
		let result;
		if (!(_status.toLowerCase() === "all")) {
			result = allRents.filter((item) => {
				if (item.status.toLowerCase() === _status.toLowerCase()) return item;
				else return null;
			});
		} else result = allRents;
		setRentPool(result);
	};

	//Map rent data into components
	let rentMarkup = rentPool.map((rent) => (
		<RentRow key={rent._id} rent={rent} onView={setRent} />
	));

	return (
		<div className="manage-equipment">
			<Card style={{ marginBottom: 20 }}>
				<Card.Body>
					<Card.Title>Search Rents</Card.Title>
					<Card.Body>
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
								<Button
									className="search-user-button"
									variant="outline-primary"
									onClick={() => {
										changeStatus("all");
									}}
								>
									All
								</Button>{" "}
								<Button
									className="search-user-button"
									variant="outline-secondary"
									onClick={() => {
										changeStatus("pending");
									}}
								>
									Pending
								</Button>{" "}
								<Button
									className="search-user-button"
									variant="outline-warning"
									onClick={() => {
										changeStatus("collected");
									}}
								>
									Collected
								</Button>{" "}
								<Button
									className="search-user-button"
									variant="outline-success"
									onClick={() => {
										changeStatus("returned");
									}}
								>
									Returned
								</Button>{" "}
							</Col>
						</Row>
					</Card.Body>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Table striped bordered hover className="manage-equipment-table">
						<thead>
							<tr>
								<th>Vehicle Number</th>
								<th>Vehicle</th>
								<th>Pickup Date</th>
								<th>Dropoff Date</th>
								<th>Customer Name</th>
								<th>Rent Amount</th>
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{!loading && rentPool.length > 0 ? (
								rentMarkup
							) : rentPool.length === 0 && !loading ? (
								<tr>
									<td colSpan="8">
										<Alert variant="warning">No rents found!</Alert>
									</td>
								</tr>
							) : (
								<tr>
									<td colSpan="8">Loading!</td>
								</tr>
							)}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
			{modalShow && (
				<ViewRentModal
					rent={rent}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
			)}
		</div>
	);
}

ManageRents.propTypes = {
	getAllRents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.data,
});

const mapActionsToProps = {
	getAllRents,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageRents);
