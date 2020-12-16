import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const authRoute = ({ component: Component, authenticated, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated || role === "admin" ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  role: state.user.role,
});

authRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  role: PropTypes.string,
};

export default connect(mapStateToProps)(authRoute);
