import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const authRoute = ({
  component: Component,
  authenticated,
  licenseImageURL,
  alternateIDImageURL,
  role,
  user,
  ...rest
}) => {
  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        (licenseImageURL && alternateIDImageURL) ||
        !authenticated ||
        role === "admin" ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  licenseImageURL: state.user.licenseImageURL,
  alternateIDImageURL: state.user.alternateIDImageURL,
  authenticated: state.user.authenticated,
  role: state.user.role,
  user: state.user,
});

authRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(authRoute);
