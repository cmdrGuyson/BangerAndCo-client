import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

import { Fragment } from "react";

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
