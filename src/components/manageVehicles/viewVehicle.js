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

export default function viewVehicle() {
  return (
    <Card className="view-user-card">
      <Card.Body>
        <Card.Img
          variant="top"
          src="http://localhost:5000/vehicles/default_car.jpg"
        />

        <hr />

        <ListGroup>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">NIC number</Badge>
            <span> Name</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Driver's license number</Badge>
            <span> Blame</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Contact number</Badge>
            <span> Flame</span>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Badge variant="secondary">Date of birth</Badge>
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
