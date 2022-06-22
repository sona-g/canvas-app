import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import postContext from '../components/PostContext';
import { useContext } from 'react';
import Header from '../components/Header';

const Main = () => {
    const {posts, handleLike} = useContext(postContext);
//    console.log(posts);
    return (
        <>
        <Header />
        <div className="postContainer" style={{ display: "flex" }}>
            {posts.map((post) => {
                return (
                    <div className="card" style={{ width: '18rem' }} key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title" style={{ textAlign: "left" }}>{post.ownerOfPost.name}</h5>
                            <Link to="/posts/:id" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <img src={post.image} className="card-img-top" alt={post.title} /></Link>
                            <div className="card-text" style={{ justifyContent: "space-between" }}>
                                <p style={{ textAlign: "left", fontWeight: "bold", marginBottom: "2%" }}>{post.usersLikedList.length} Likes</p>
                                <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>{post.ownerOfPost.name}</span>:    {post.title}</p> 
                                <p className="d-flex justify-content-between">
                                    <span style={{ fontSize: "70%" }}>Date/Time</span>
                                    <button type="button" className="btn btn-light" onClick={() => handleLike(post._id)}><MdFavoriteBorder />
                                    </button></p>
                            </div>
                        </div>
                        
                    </div>)
            })}
        </div>
        </>
    );
};

export default Main;