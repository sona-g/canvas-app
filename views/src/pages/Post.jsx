import React from 'react';
import postContext from '../components/PostContext';
import { useContext } from 'react';
import Header from '../components/Header';

const Post = () => {
    const { posts } = useContext(postContext);
    return (
        <div>
            <Header />
            {posts.map((post) => {
                return (
                    <div className="card" style={{ width: '50%' }} key={post._id}>
                        <div className="card-body">
                        <h5 className="card-title" style={{ textAlign: "left" }}>{post.ownerOfPost.name}</h5>
                        <img src={post.image} className="card-img-top" alt={post.title} />
                        <div className="card-text" style={{ justifyContent: "space-between" }}>
                                <p style={{ textAlign: "left", fontWeight: "bold", marginBottom: "2%" }}>Liked by  {post?.usersLikedList[0]?.name}   and {post.usersLikedList.length - 1} more</p>
                                <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>{post.ownerOfPost.name}</span>:    {post.description}</p> 
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};

export default Post;