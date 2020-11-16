import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withFormik } from "formik";
import * as yup from "yup";

import { isOver18 } from "../../utils/util";

import Navbar from "../../components/navbar/navbar";

import "./register.scss";

const Register = (props) => {
  const {
    errors,
    handleSubmit,
    touched,
    handleBlur,
    values,
    handleChange,
  } = props;

  const useInput = ({ type, label, placeholder, id }) => {
    const input = (
      <Form.Group controlId={id}>
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          className="form"
          value={values[id]}
          onChange={handleChange}
          required
          name={id}
          onBlur={handleBlur}
          isInvalid={touched[id] && errors[id]}
        />
        {touched[id] && errors[id] ? (
          <Form.Control.Feedback type="invalid">
            {errors[id]}
          </Form.Control.Feedback>
        ) : null}
      </Form.Group>
    );
    return input;
  };

  const emailInput = useInput({
    type: "email",
    label: "Email address",
    id: "email",
  });
  const passwordInput = useInput({
    type: "password",
    label: "Password",
    id: "password",
  });
  const confirmPasswordInput = useInput({
    type: "password",
    label: "Confirm Password",
    id: "confirmPassword",
  });
  const firstNameInput = useInput({
    type: "text",
    label: "First Name",
    id: "firstName",
  });
  const lastNameInput = useInput({
    type: "text",
    label: "Last Name",
    id: "lastName",
  });
  const NICInput = useInput({
    type: "text",
    label: "NIC Number",
    id: "NIC",
  });
  const DLNInput = useInput({
    type: "text",
    label: "Driver's License Number",
    id: "DLN",
  });
  const dateOfBirthInput = useInput({
    type: "date",
    label: "Date of birth",
    id: "DOB",
  });
  const contactNumberInput = useInput({
    type: "text",
    label: "Contact Number",
    id: "contact",
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
                <Form noValidate onSubmit={handleSubmit}>
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
};

export default withFormik({
  validationSchema: yup.object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email addresss").required("Required"),
    NIC: yup
      .string()
      .required("Required")
      .matches(/^\d{9}(v|V)$/, "Invalid NIC number"),
    DLN: yup.string().required("Required"),
    contact: yup
      .string()
      .required("Required")
      .matches(/^\d{10}$/, "Invalid contact number"),
    DOB: yup
      .date()
      .required("Required")
      .test("DOB", "You should be 18 years or older", (value) => {
        return isOver18(value);
      }),
    password: yup.string().required("Required"),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  }),
  mapPropsToValues: () => ({
    firstName: "",
    lastName: "",
    email: "",
    NIC: "",
    DLN: "",
    contact: "",
    DOB: "",
    password: "",
    confirmPassword: "",
  }),
  handleSubmit: (values) => {
    console.log("Handle submit here");
  },
})(Register);
