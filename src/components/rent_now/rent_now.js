import React from "react";
import { Row, Col, Button } from "react-bootstrap";

//CSS
import "./rent_now.scss";

export default function rent_now() {
  return (
    <div className="box">
      <Row>
        <Col>
          <p>Pickup Date and Time</p>
          <input className="rent-now-input" type="date"></input>
          <input className="rent-now-input" type="time"></input>
        </Col>
        <Col>
          <p>Dropoff Date and Time</p>
          <input className="rent-now-input" type="date"></input>
          <input className="rent-now-input" type="time"></input>
        </Col>
        <Col className="col-button">
          <Button variant="primary" className="search-button">
            Search
          </Button>
        </Col>
      </Row>
    </div>
  );
}
