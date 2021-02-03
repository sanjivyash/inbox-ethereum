import React from 'react';
import ReactDOM from 'react-dom';

import web3 from './web3';
import inbox from './inbox';

class App extends React.Component {
	state = { message: "" };

	async componentDidMount() {
		const message = await inbox.methods.message().call();
		this.setState({ message });
	}

	changeMessage = async (e) => {
		e.preventDefault();

		const input = document.getElementById("new-message");
		const account = await web3.eth.getAccounts();
		await inbox.methods
			.setMessage(input.value)
			.send({ from: account[0] });

		const message = await inbox.methods.message().call();
		this.setState({ message });
		input.value = "";
	}

	render() {
		return (
			<div>
				<h2>Inbox Contract!</h2> 
				<p>The current message in the inbox is { this.state.message }</p>

				<form onSubmit={this.changeMessage}>
					<label>Enter New Message:</label><br/>
				  <input type="text" id="new-message"/><br/><br/>
				  <input type="submit" value="Submit"/>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
