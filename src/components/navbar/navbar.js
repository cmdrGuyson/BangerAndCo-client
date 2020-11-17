import React, { Fragment } from "react";
import { Nav, Container, Navbar, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./navbar.scss";

//REDUX
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

function navbar(props) {
  const { authenticated } = props;

  const handleLogout = () => {
    props.logoutUser();
  };

  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar">
        <Navbar.Brand href="/" className="logo">
          Banger&Co
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link>View Fleet</Nav.Link>
            <Nav.Link>Rent Car</Nav.Link>
            {!authenticated ? (
              <Fragment>
                <Button
                  variant="outline-light"
                  size="sm"
                  href="/login"
                  className="button"
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  href="/register"
                  className="button"
                >
                  Register
                </Button>
              </Fragment>
            ) : (
              <Button
                variant="outline-light"
                size="sm"
                className="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(navbar);
