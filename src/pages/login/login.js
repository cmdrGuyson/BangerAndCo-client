import React from "react";

import "./login.scss";

import Navbar from "../../components/navbar/navbar";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export default function login() {
  return (
    <div className="login_main">
      <Navbar />
      <Container className="container-main">
        <Row>
          <Col>
            <h2 className="title">Login to rent now!</h2>
            <p className="description">
              Fringilla ut morbi tincidunt augue interdum velit euismod in
              pellentesque. At risus viverra adipiscing at in tellus integer.
            </p>
          </Col>
          <Col>
            <Card className="card">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="label">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      className="form"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="label">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      className="form"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-button"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
