//MODULE IMPORT
import React from "react";
import { Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";
//CSS IMPORT
import "./home.scss";
//COMPONENT IMPORT
import RentNow from "../../components/rent_now/rent_now";
import Navbar from "../../components/navbar/navbar";

//REDUX
import { connect } from "react-redux";

function home(props) {
  return (
    <div className="top_image">
      <Navbar />

      <Container style={{ textAlign: "center" }}>
        {/* Alert message to be shown if user has not yet uploaded ID images */}
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={
            !props.authenticated ||
            props.role === "admin" ||
            (props.licenseImageURL &&
              props.alternateIDImageURL &&
              props.userImageURL) ||
            props.isVerified
          }
        >
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImages">
            Click here to <b>upload verification images</b>
          </a>
        </Alert>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={!props.isBlacklisted}
        >
          You have been <b>blacklisted</b>. You will not be able to rent any
          vehicles.
        </Alert>
        <h2 className="title">Rent Now!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>

        <RentNow history={props.history} />
        <h2 className="about-title">About us</h2>
        <p className="about-description">
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
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  licenseImageURL: state.user.licenseImageURL,
  alternateIDImageURL: state.user.alternateIDImageURL,
  userImageURL: state.user.userImageURL,
  authenticated: state.user.authenticated,
  isVerified: state.user.isVerified,
  isBlacklisted: state.user.isBlacklisted,
  role: state.user.role,
  user: state.user,
});

home.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(home);
