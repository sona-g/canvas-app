import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		console.log(searchQuery);
	};

	return (
		<div className="NavBar">
			<Link to="/">
				<img id="logo" src="https://i.imgur.com/dXjWbR1.png" alt="logo" />
			</Link>
			<Link className="NavBarLink" to="/user">
				Login / Sign Up
			</Link>
			<Link className="NavBarLink" to="/posts">
				Main
			</Link>
			<Link className="NavBarLink" to="/posts/:id">
				selectedPost placeholder
			</Link>

			<input
				id="search"
				name="search"
				type="search"
				placeholder="search for a post"
				onChange={handleSearch}
			/>
		</div>
	);
};

export default Header;
