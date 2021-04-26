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
import Success from "./pages/success/success";
import MyRents from "./pages/myRents/myRents";
import Blacklisted from "./pages/blacklisted/blacklisted";
import Fraud from "./pages/fraud/fraud";

/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Utils
import AuthRoute from "./utils/authRoute";
//import AuthRouteUser from "./utils/authRouteUser";
import AuthRouteAdmin from "./utils/authRouteAdmin";
import AuthRouteAll from "./utils/authRouteAll";

axios.defaults.baseURL = "http://localhost:5000";

const token = localStorage.BangerToken;

//Check validity of JWT token
if (token) {
  const decodedToken = jwtDecode(token);
  //Check if token is expired
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
            <Route exact path="/rent-vehicles" component={Vehicles} />
            <AuthRouteAll exact path="/uploadimages" component={UploadImages} />
            <AuthRouteAll exact path="/success" component={Success} />
            <AuthRouteAll exact path="/blacklisted" component={Blacklisted} />
            <AuthRouteAll exact path="/fraud" component={Fraud} />
            <AuthRouteAdmin exact path="/dashboard" component={Dashboard} />
            <AuthRouteAll exact path="/my-rents" component={MyRents} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default App;
