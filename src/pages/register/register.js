import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

import Navbar from "../../components/navbar/navbar";

import "./register.scss";

export default function Register() {
  const useInput = ({
    type,
    value,
    label,
    placeholder,
    changeHandler,
    id,
    validation,
    pattern,
  }) => {
    const input = (
      <Form.Group controlId={id}>
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          className="form"
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
          name={id}
          pattern={pattern}
        />
        <Form.Control.Feedback type="invalid">
          {validation}
        </Form.Control.Feedback>
      </Form.Group>
    );
    return input;
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (password !== confirmPassword) {
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [NIC, setNIC] = useState("");
  const [DLN, setDLN] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const emailInput = useInput({
    type: "email",
    value: email,
    label: "Email address",
    changeHandler: setEmail,
    id: "email",
    validation: "Please enter valid email",
  });
  const passwordInput = useInput({
    type: "password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
    id: "password",
    validation: "Please enter valid password",
  });
  const confirmPasswordInput = useInput({
    type: "password",
    value: confirmPassword,
    label: "Confirm Password",
    changeHandler: setConfirmPassword,
    id: "confirmPassword",
    validation: "Please enter matching password",
  });
  const firstNameInput = useInput({
    type: "text",
    value: firstName,
    label: "First Name",
    changeHandler: setFirstName,
    id: "firstName",
    validation: "Please valid first name",
  });
  const lastNameInput = useInput({
    type: "text",
    value: lastName,
    label: "Last Name",
    changeHandler: setLastName,
    id: "lastName",
    validation: "Please enter valid last name",
  });
  const NICInput = useInput({
    type: "text",
    value: NIC,
    label: "NIC Number",
    changeHandler: setNIC,
    id: "NIC",
    validation: "Please enter valid NIC number",
    pattern: /^\d{9}(v|V)$/,
  });
  const DLNInput = useInput({
    type: "text",
    value: DLN,
    label: "Driver's License Number",
    changeHandler: setDLN,
    id: "DLN",
    validation: "Please enter valid driver's license number",
  });
  const dateOfBirthInput = useInput({
    type: "date",
    value: dateOfBirth,
    label: "Date of birth",
    changeHandler: setDateOfBirth,
    id: "DOB",
    validation: "You should be at least 18 years old",
  });
  const contactNumberInput = useInput({
    type: "text",
    value: contactNumber,
    label: "Contact Number",
    changeHandler: setContactNumber,
    id: "contact",
    validation: "Please enter valid contact number",
    pattern: /^\d{10}$/,
  });

  return (
    <div className="main_register">
      <Navbar />
      <Container className="container-main-register">
        <Row>
          <Col>
            <Card className="card">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  {firstNameInput}
                  {lastNameInput}
                  {emailInput}
                  {passwordInput}
                  {confirmPasswordInput}
                  {NICInput}
                  {DLNInput}
                  {dateOfBirthInput}
                  {contactNumberInput}
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
          <Col>
            <h2 className="title">REGISTER</h2>
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
        </Row>
      </Container>
    </div>
  );
}
