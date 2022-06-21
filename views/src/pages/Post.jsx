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
                    <div class="card" style={{ width: '50%' }}>
                        <div class="card-body">
                        <h5 class="card-title" style={{ textAlign: "left" }}>{post.ownerOfPost}</h5>
                        <img src={post.image} class="card-img-top" alt={post.title} />
                        <div className="card-text" style={{ justifyContent: "space-between" }}>
                                <p style={{ textAlign: "left", fontWeight: "bold", marginBottom: "2%" }}>Liked by  {post.usersLikedList[0]}   and {post.usersLikedList.length - 1} more</p>
                                <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>{post.ownerOfPost}</span>:    {post.description}</p> 
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
};

export default Post;