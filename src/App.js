import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={SearchPage} />
					<Route exact path="/history" component={HistoryPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
