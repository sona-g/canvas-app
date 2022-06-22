import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import loginContext from './LoginContext';
import { useContext } from 'react';

const Header = () => {
	const { user } = useContext(loginContext);
	const [searchQuery, setSearchQuery] = useState('');
	

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		console.log(searchQuery);
	};

	return (
		<div className="NavBar">
			<Link to="/posts">
				<img id="logo" src="https://i.imgur.com/dXjWbR1.png" alt="logo" />
			</Link>
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
			<h3>Hello, Brandon</h3>
		</div>
	);
};

export default Header;
