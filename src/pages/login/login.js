import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import Navbar from "../../components/navbar/navbar";

import "./login.scss";

export default function Login() {
  const useInput = ({ type, value, label, placeholder, changeHandler }) => {
    const input = (
      <Form.Group controlId="formBasicEmail">
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          className="form"
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
        />
      </Form.Group>
    );
    return input;
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInput = useInput({
    type: "email",
    value: email,
    label: "Email address",
    changeHandler: setEmail,
  });
  const passwordInput = useInput({
    type: "password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
  });

  return (
    <div className="login_main">
      <Navbar />
      <Container className="container-main">
        <Row>
          <Col>
            <h2 className="title">SIGN IN </h2>
            <p className="description">
              Fringilla ut morbi tincidunt augue interdum velit euismod in
              pellentesque. At risus viverra adipiscing at in tellus integer. Id
              aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet
              id donec ultrices tincidunt. Bibendum at varius vel pharetra.
              Viverra adipiscing at in tellus integer. Amet volutpat consequat
              mauris nunc congue nisi vitae suscipit. Pretium viverra
              suspendisse potenti nullam ac tortor. Et egestas quis ipsum
              suspendisse. Cursus in hac habitasse platea dictumst quisque. Mi
              proin sed libero enim sed faucibus turpis in eu.
            </p>
          </Col>
          <Col>
            <Card className="card">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <Form>
                  {emailInput}
                  {passwordInput}
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
