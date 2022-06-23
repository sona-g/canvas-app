import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import loginContext from './LoginContext';
import { useContext } from 'react';

const Header = () => {
	const { user } = useContext(loginContext);
	const [searchQuery, setSearchQuery] = useState('');
	const nav = useNavigate();

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		console.log(searchQuery);

		//use api to search posts

		// 	fetch('/api/posts', {
		// 		method: 'GET',
		// 		headers: { 'Content-Type': 'application/json' },
		// 		body: JSON.stringify({
		// 			title,
		// 			description: desc,
		// 			image: imageSrc,
		// 			ownerOfPost: user[0]._id,
		// 		}),
		// 	})
		// 		.then((response) => response.json())
		// 		.then((data) => {
		// 			console.log(data);
		// 		});
		// 	navigate('/posts', { replace: true });
		// 	// window.location.reload();
		// };
	};

	return (
		<div className="NavBar">
			<img
				id="logo"
				src="https://i.imgur.com/dXjWbR1.png"
				alt="logo"
				onClick={() => nav('/posts')}
			/>
			<input
				id="search"
				name="search"
				type="search"
				placeholder="search for a post"
				onChange={handleSearch}
			/>

			<Link className="NavBarLink" to="/posts/new">
				Create Post
			</Link>
			<Link className="NavBarLink" to="/myposts">
				My Posts
			</Link>
			{/* <h3>Hello, {user[0]?.name}</h3> */}
		</div>
	);
};

export default Header;
