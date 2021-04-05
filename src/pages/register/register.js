import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import Navbar from "../../components/navbar/navbar";

import "./register.scss";

//REDUX
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [NIC, setNIC] = useState("");
  const [DLN, setDLN] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  //Function to generate form control inputs for each field
  const useInput = ({
    type,
    value,
    label,
    placeholder,
    changeHandler,
    id,
    pattern,
    isTextArea,
  }) => {
    const input = (
      <Form.Group controlId={id}>
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          className={errors[id] ? "form is-invalid" : "form"}
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
          name={id}
          pattern={pattern}
          as={isTextArea && "textarea"}
        />
        <p className="error-text" hidden={!errors[id]}>
          {errors[id]}
        </p>
      </Form.Group>
    );
    return input;
  };

  //Update state with errors
  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.error);
  }, [props.UI.errors]);

  //When submit button is clicked
  const handleSubmit = (event) => {
    //Prevent page from reloading
    event.preventDefault();
    const data = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      contactNumber,
      NIC,
      DLN,
      dateOfBirth,
      address,
    };
    //Use user input to register user
    props.registerUser(data, props.history);
  };

  const emailInput = useInput({
    type: "email",
    value: email,
    label: "Email address",
    changeHandler: setEmail,
    id: "email",
  });
  const passwordInput = useInput({
    type: "password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
    id: "password",
  });
  const confirmPasswordInput = useInput({
    type: "password",
    value: confirmPassword,
    label: "Confirm Password",
    changeHandler: setConfirmPassword,
    id: "confirmPassword",
  });
  const firstNameInput = useInput({
    type: "text",
    value: firstName,
    label: "First Name",
    changeHandler: setFirstName,
    id: "firstName",
  });
  const lastNameInput = useInput({
    type: "text",
    value: lastName,
    label: "Last Name",
    changeHandler: setLastName,
    id: "lastName",
  });
  const NICInput = useInput({
    type: "text",
    value: NIC,
    label: "NIC Number",
    changeHandler: setNIC,
    id: "NIC",
    pattern: "[0-9]{9}[v|V]",
  });
  const DLNInput = useInput({
    type: "text",
    value: DLN,
    label: "Driver's License Number",
    changeHandler: setDLN,
    id: "DLN",
  });
  const dateOfBirthInput = useInput({
    type: "date",
    value: dateOfBirth,
    label: "Date of birth",
    changeHandler: setDateOfBirth,
    id: "dateOfBirth",
  });
  const contactNumberInput = useInput({
    type: "text",
    value: contactNumber,
    label: "Contact Number",
    changeHandler: setContactNumber,
    id: "contactNumber",
    pattern: "[0-9]{10}",
  });
  const addressInput = useInput({
    type: "text",
    value: address,
    label: "Address",
    changeHandler: setAddress,
    id: "address",
    isTextArea: true,
  });

  return (
    <div className="main_register">
      <Navbar />
      <Container className="container-main-register">
        <Row>
          <Col>
            <Card className="card card-input-box">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <Form onSubmit={handleSubmit}>
                  {firstNameInput}
                  {lastNameInput}
                  {emailInput}
                  {passwordInput}
                  {confirmPasswordInput}
                  {NICInput}
                  {DLNInput}
                  {dateOfBirthInput}
                  {contactNumberInput}
                  {addressInput}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Register);
