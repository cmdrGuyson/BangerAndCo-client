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
              <Button className="search-user-button" variant="outline-primary">
                All Users
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-secondary"
              >
                Non-verified
              </Button>{" "}
              <Button className="search-user-button" variant="outline-success">
                Premium
              </Button>{" "}
              <Button className="search-user-button" variant="outline-danger">
                Blacklisted
              </Button>{" "}
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
