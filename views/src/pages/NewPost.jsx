import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import { useContext } from 'react';
import loginContext from '../components/LoginContext';
import { useNavigate } from 'react-router-dom';
import postContext from '../components/PostContext';

const NewPost = () => {
	let navigate = useNavigate();
	const { user, setUser } = useContext(loginContext);
	const { counter, setCounter } = useContext(postContext);
	const [imageSrc, setImageSrc] = useState(null);
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		//pass down data collected in front-end to the back-end
		console.log('NewPost: Submit');
		console.log('newPost', user);
		fetch('/api/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description: desc,
				image: imageSrc,
				ownerOfPost: user?.[0]?._id,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});

		//need to re-render with REACT
		setCounter(counter + 1);
		navigate('/posts', { replace: true });

		//will eventually fail if continue doing
		//useContext fundamentally wrong
		//race condition
	};

return (
		<>
			<Header />

			<div>
				<form method="post" onSubmit={handleSubmit}>
					<h2>Create Post</h2>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="image">Image Source:</label>
								</td>
								<td>
									<input
										onChange={(event) => setImageSrc(event.target.value)}
										type="text"
										name="image"
										placeholder="input an image source"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="title">Title:</label>
								</td>
								<td>
									<input
										onChange={(event) => setTitle(event.target.value)}
										type="text"
										name="title"
										placeholder="input a title"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="description">Description:</label>
								</td>
								<td>
									<textarea
										onChange={(event) => setDesc(event.target.value)}
										name="description"
										placeholder="type your thoughts here"
										rows="4"
										cols="30"
									></textarea>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button>Submit</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</>
	);
};

export default NewPost;
