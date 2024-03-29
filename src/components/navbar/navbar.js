import React, { Fragment } from "react";
import { Nav, Container, Navbar, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./navbar.scss";

//REDUX
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

function navbar(props) {
  const {
    authenticated,
    user: { role },
  } = props;

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
            <Nav.Link href="/rent-vehicles">Rent Vehicle</Nav.Link>
            {/* If user is authenticated show "My Rents" link */}
            {authenticated && <Nav.Link href="/my-rents">My Rents</Nav.Link>}
            {/* If user is an admin show link to "Admin dashboard" */}
            {role === "admin" && (
              <Button
                variant="outline-light"
                size="sm"
                className="button"
                href="/dashboard"
              >
                Admin Dashboard
              </Button>
            )}
            {/* If user is authenticated show "Settings" link */}
            {authenticated && (
              <Button
                variant="outline-light"
                size="sm"
                className="button"
                href="/uploadImages"
              >
                Settings
              </Button>
            )}
            {/* If user is not authenticated show "Login and Register" links else show "Logout" button*/}
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
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(navbar);
