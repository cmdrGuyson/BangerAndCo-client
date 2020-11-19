import React from "react";
import {
  InputGroup,
  Card,
  Dropdown,
  Button,
  ButtonGroup,
  DropdownButton,
  Col,
  Row,
  FormControl,
  CardDeck,
} from "react-bootstrap";

import "./manageUsers.scss";

export default function manageUsers() {
  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search Users</Card.Title>
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
                active
              >
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

      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{" "}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
}
