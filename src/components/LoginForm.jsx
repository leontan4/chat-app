import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const authObject = {
			"Project-ID": "88f167d4-c0b8-4696-8198-9ad57494e6d6",
			"User-Name": userName,
			"User-Secret": password,
		};

		// userName | password => chat-engine -> give messages
		try {
			await axios.get("https://api.chatengine.io/chats", {
				headers: authObject,
			});

			// works out -> logged in
			// only logged in once
			localStorage.setItem("username", userName);
			localStorage.setItem("password", password);

			window.location.reload();
		} catch (error) {
			// error -> try with new credentials (userName || password)
			setError("Wrong username or password. Please try again.");
		}
	};

	return (
		<div className="wrapper">
			<div className="form">
				<h1 className="title">Chat Application</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={userName}
						onChange={(event) => setUserName(event.target.value)}
						className="input"
						placeholder="Username"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="input"
						placeholder="Password"
						required
					/>
					<div aslign="center">
						<button type="submit" className="button">
							<span>Start Chatting</span>
						</button>
					</div>
					<h2 className="error">{error}</h2>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
