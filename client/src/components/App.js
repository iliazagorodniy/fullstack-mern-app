// Rendering layer control (React Router)

import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions'

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<Header />
					<Route exact path="/" component={ Landing }></Route>
					<Route exact path="/surveys" component={ Dashboard }></Route>
					<Route path="/surveys/new" component={ SurveyNew }></Route>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);