import React from "react";
import {
	Card,
	Row,
	Col,
	Badge,
	ListGroup,
	Button,
	ButtonGroup,
} from "react-bootstrap";
import "./viewVehicle.scss";

export default function viewVehicle() {
	return (
		<Card className="view-user-card">
			<Card.Body>
				<div
					className="vehicle-image"
					style={{
						backgroundImage:
							"src(http://localhost:5000/vehicles/default_car.jpg)",
					}}
				></div>

				<hr />

				<ListGroup>
					<ListGroup.Item variant="light">
						<Badge variant="secondary">Chassis number</Badge>
						<span> Name</span>
					</ListGroup.Item>
					<ListGroup.Item variant="light">
						<Badge variant="secondary">License number</Badge>
						<span> Blame</span>
					</ListGroup.Item>
					<ListGroup.Item variant="light">
						<Badge variant="secondary">Mileage</Badge>
						<span> Flame</span>
					</ListGroup.Item>
					<ListGroup.Item variant="light">
						<Badge variant="secondary">Registration number</Badge>
						<span> Game</span>
					</ListGroup.Item>
				</ListGroup>
			</Card.Body>

			<Card.Footer>
				{" "}
				<small className="text-muted">
					{/* {`Registered on ${dayjs(user.createdAt).toString()}`} */}
				</small>
			</Card.Footer>
		</Card>
	);
}
