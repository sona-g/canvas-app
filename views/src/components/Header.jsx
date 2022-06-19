import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div className="NavBar">
			<Link to="/">
				<img id="logo" src="https://i.imgur.com/oqfbc6g.png" alt="logo" />
			</Link>
			<Link className="NavBarLink" to="user">
				Login
			</Link>
			<Link className="NavBarLink" to="posts">
				Main
			</Link>
			<Link className="NavBarLink" to="posts/:id">
				selectedPost
			</Link>
		</div>
	);
};

export default Header;
