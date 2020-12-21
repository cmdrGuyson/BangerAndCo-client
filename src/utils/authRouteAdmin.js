import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Authorization route for pages only admins can access
const authRoute = ({
  component: Component,
  authenticated,
  role,
  loading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      role === "admin" || (loading && authenticated) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.user.loading,
  role: state.user.role,
});

authRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(authRoute);
