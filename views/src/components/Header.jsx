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
		<div className="d-inline-flex p-2 bd-highlight">
		<div className="m-4" style={{marginBottom: "2%"}}>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
            <a href="/posts" className="navbar-brand" style={{textAlign: 'left', maxWidth: '40%'}}><img style={{maxWidth: '20%'}} src={require('../assets/logo_transparent.png')} alt="canvas"/></a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse" style={{flexBasis: '100%'}}>
                <ul className="nav navbar-nav">
                    <li className="nav-item">
                        <a href="/posts" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/myPosts" className="nav-link">Profile</a>
                    </li>
					<li className="nav-item">
                        <a href="/posts/new" className="nav-link">Create</a>
                    </li>
                </ul>
				<input id="search"
				name="search"
				type="search"
				placeholder="search for a post"
				onChange={handleSearch}/>
                <ul className="nav navbar-nav ms-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Admin</a>
                        {/* <div className="dropdown-menu dropdown-menu-end">
                            <a href="/" className="dropdown-item">Logout</a>
                        </div> */}
                    </li>
                </ul>
            </div>
        </div>
    </nav>   
	</div>
	</div>

		//  <div className="NavBar">
		// 		<img id="logo" src="https://i.imgur.com/dXjWbR1.png" alt="logo" 
		// 		onClick={() => nav("/posts")}/>
		// 	<input
		// 		id="search"
		// 		name="search"
		// 		type="search"
		// 		placeholder="search for a post"
		// 		onChange={handleSearch}
		// 	/>

		// 	 <Link className="NavBarLink" to="/posts/new">
		// 		Create Post
		// 	</Link>
		// 	<Link className="NavBarLink" to="/myposts">
		// 		My Posts
		// 	</Link>
		// 	<h3>Hello, {user?.[0]?.name}</h3> 
		// </div> 
	);
};

export default Header;
