// Rendering layer control (React Router)

import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

function App(props) {
	return (
		<div>
			<BrowserRouter>
				<Route path="/" component={Landing}></Route>
			</BrowserRouter>
		</div>
	);
}

export default App;