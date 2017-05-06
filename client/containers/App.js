import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../actions/app.js';
import * as signInActions from '../actions/signIn.js';
import Notification from './Notification.js';
import Header from './Header.js';
import Footer from './Footer.js';

class App extends React.Component {
	componentWillMount() {
		if(localStorage.getItem('userToken') === null) return;
		this.props.dispatch(signInActions.signIn());
	}

	componentDidUpdate() {
		if(this.props.app.shouldBackHome) {
			this.props.dispatch(actions.backHome());
			this.context.router.push('/');
		}
	}

	render() {
		document.title = this.props.app.title;
		return (
			<div>
				<Notification />
				<div id="headerOuter">
					<Header />
				</div>
				<div id="content">
					{this.props.children}
				</div>
				<div id="footerOuter">
					<Footer />
				</div>
			</div>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object.isRequired,
	};
}

function mapStateToProps(state) {
	return {
		app: state.app,
	};
}

export default ReactRedux.connect(mapStateToProps)(App);