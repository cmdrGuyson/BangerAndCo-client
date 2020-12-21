import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Authorization route for pages for authenticated users
const authRoute = ({ component: Component, authenticated, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

authRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(authRoute);
