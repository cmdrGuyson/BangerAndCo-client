//MODULE IMPORT
import React from "react";
import { Container, Button } from "react-bootstrap";
//import PropTypes from "prop-types";
//CSS IMPORT
import "./blacklisted.scss";
//COMPONENT IMPORT
import Navbar from "../../components/navbar/navbar";

//REDUX
import { connect } from "react-redux";

function success(props) {
  return (
    <div className="top_image-blacklisted">
      <Navbar />

      <Container style={{ textAlign: "center" }}>
        <h2 className="blacklisted-title">You have been blacklisted!</h2>
        <p className="blacklisted-description">
          Fringilla ut morbi tincidunt augue interdum velit euismod in
          pellentesque. At risus viverra adipiscing at in tellus integer. Id
          aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet id
          donec ultrices tincidunt. Bibendum at varius vel pharetra. Viverra
          adipiscing at in tellus integer. Amet volutpat consequat mauris nunc
          congue nisi vitae suscipit. Pretium viverra suspendisse potenti nullam
          ac tortor. Et egestas quis ipsum suspendisse. Cursus in hac habitasse
          platea dictumst quisque. Mi proin sed libero enim sed faucibus turpis
          in eu.
        </p>
        <Button href="/" variant="outline-light" className="blacklisted-button">
          Go Home
        </Button>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({});

success.propTypes = {};

export default connect(mapStateToProps)(success);
