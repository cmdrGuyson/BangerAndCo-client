import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const authRoute = ({
  component: Component,
  authenticated,
  licenseImageURL,
  alternateIDImageURL,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      (licenseImageURL && alternateIDImageURL) || !authenticated ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  licenseImageURL: state.user.licenseImageURL,
  alternateIDImageURL: state.user.alternateIDImageURL,
  authenticated: state.user.authenticated,
});

authRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(authRoute);
