import React from 'react';
import { useState } from 'react';

const NewPost = () => {
	const [imageSrc, setImageSrc] = useState(null);
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		//pass down data collected in front-end to the back-end
		console.log('Submit');
		fetch('/api/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, description: desc, image: imageSrc }),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	};

	// fetch('/api/posts/')
	// 	.then((response) => response.json)
	// 	.then((data) => setPost(data));
	// console.log(post);
	// })

	return (
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
	);
};

export default NewPost;
