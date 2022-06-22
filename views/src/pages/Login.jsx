import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import loginContext from '../components/LoginContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const { user, setUser } = useContext(loginContext);
	// console.log(user);
	let navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const userInfo = {
			username: event.target.elements.formGroupEmail.value,
			password: event.target.elements.formGroupPassword.value,
		};
		console.log(userInfo);
		setUser(userInfo);
		// fetch('/api/user/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(userInfo),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => setUser(data));

		navigate('/posts', { replace: true });
	};

	return (
		<div style={{ marginLeft: '25%', marginTop: '2%', width: '50%' }}>
			<Form onSubmit={handleSubmit} style={{ margin: '7%' }}>
				<img
					style={{ maxWidth: '40%' }}
					src={require('../assets/logo_transparent.png')}
					alt="canvas"
				/>
				<p></p>
				<h3>LOG IN</h3>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Control
						type="text"
						placeholder="Enter email or username"
						required={true}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Control
						type="password"
						placeholder="Password"
						required={true}
					/>
				</Form.Group>
				<Button
					className="d-grid gap-2 col-12 mx-auto"
					variant="warning"
					size="lg"
					type="submit"
				>
					LOGIN
				</Button>
				<p></p>
				<Button
					className="d-grid gap-2 col-12 mx-auto"
					variant="warning"
					size="lg"
					type="submit"
				>
					CREATE ACCOUNT
				</Button>
			</Form>
		</div>
	);
};

export default Login;
