import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Link to="/">HOME PAGE</Link>
            <input type= "search" placeholder="search for posts" />
            <button>Create Post</button>
            <button>User</button>
        </div>
    );
};

export default Header;