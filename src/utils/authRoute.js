import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Authorization route for pages only unauthenticated users can access
const authRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

authRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(authRoute);
