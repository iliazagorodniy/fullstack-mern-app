// Rendering layer control (React Router)

import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

function App(props) {
	return (
		<div className="container">
			<BrowserRouter>
				<Header />
				<Route exact path="/" component={Landing}></Route>
				<Route exact path="/surveys" component={Dashboard}></Route>
				<Route path="/surveys/new" component={SurveyNew}></Route>
			</BrowserRouter>
		</div>
	);
}

export default App;