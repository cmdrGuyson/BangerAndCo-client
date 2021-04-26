//MODULE IMPORT
import React from "react";
import { Container, Button } from "react-bootstrap";
//import PropTypes from "prop-types";
//CSS IMPORT
import "./fraud.scss";
//COMPONENT IMPORT
import Navbar from "../../components/navbar/navbar";

//REDUX
import { connect } from "react-redux";

function fraud(props) {
  return (
    <div className="top_image-blacklisted">
      <Navbar />

      <Container style={{ textAlign: "center" }}>
        <h2 className="blacklisted-title">This rent was blocked!</h2>
        <p className="blacklisted-description">
          It was found out that you have been associated with an{" "}
          <b>insuarance fraud</b>. Your attempt to rent a vehicle was blocked by
          our system. If you think this was a mistake please contact
          BangerAndCo.
        </p>
        <Button href="/" variant="outline-light" className="blacklisted-button">
          Go Home
        </Button>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({});

fraud.propTypes = {};

export default connect(mapStateToProps)(fraud);
