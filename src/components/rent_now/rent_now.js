import React from "react";
import { Row, Col, Button } from "react-bootstrap";
//import TimePicker from "react-time-picker";
//import DatePicker from "react-date-picker";

import "./rent_now.scss";

export default function rent_now() {
  return (
    <div className="box">
      <Row>
        <Col>
          <p>Pickup Date and Time</p>
          <input type="date"></input>
          <input type="time"></input>
        </Col>
        <Col>
          <p>Dropoff Date and Time</p>
          <input type="date"></input>
          <input type="time"></input>
        </Col>
      </Row>
      <Row style={{ alignContent: "center" }}>
        <Col>
          <Button variant="outline-light" size="sm">
            Find
          </Button>
        </Col>
      </Row>
    </div>
  );
}
