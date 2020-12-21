import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//Components
import Navbar from "../../components/navbar/navbar";

//CSS
import "./login.scss";

//REDUX
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //Destructure props
  const {
    UI: { loading },
  } = props;

  //Update state with errors
  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.error);
  }, [props.UI.errors]);

  //Method to handle form submission
  const handleLogin = (event) => {
    event.preventDefault();
    const data = { email, password };
    props.loginUser(data, props.history);
  };

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
            <Card className="card card-input-box">
              <Card.Body>
                <h2 className="logo">Banger&Co</h2>
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="label"> Email </Form.Label>
                    <Form.Control
                      type="email"
                      className={errors.email ? "form is-invalid" : "form"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="error-text" hidden={!errors.email}>
                      {errors.email}
                    </p>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="label"> Password </Form.Label>
                    <Form.Control
                      type="password"
                      className={errors.password ? "form is-invalid" : "form"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="error-text" hidden={!errors.password}>
                      {errors.password}
                    </p>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
