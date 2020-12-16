import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

import "./App.scss";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import UploadImages from "./pages/uploadImages/uploadImages";
import Dashboard from "./pages/dashboard/dashboard";
import Vehicles from "./pages/vehicles/vehicles";

/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Utils
import AuthRoute from "./utils/authRoute";
import AuthRouteUser from "./utils/authRouteUser";
import AuthRouteAdmin from "./utils/authRouteAdmin";

axios.defaults.baseURL = "http://localhost:5000";

const token = localStorage.BangerToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/vehicles" component={Vehicles} />
            <AuthRouteUser
              exact
              path="/uploadimages"
              component={UploadImages}
            />
            <AuthRouteAdmin exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
