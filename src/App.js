import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.scss";
import home from "./pages/home/home";
import login from "./pages/login/login";

import { Fragment } from "react";

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path="/" component={home} />
					<Route exact path="/login" component={login} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
