import React from 'react';
import postContext from '../components/PostContext';
import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { posts, setPosts } = useContext(postContext);
    // const [posts, setSinglePost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/posts/${id}`)
            .then((response) => response.json())
            .then((data) => setPosts(data.data));
    }, []);

    console.log(posts)
    return (
        <div>
            <Header />

            <div className="card" style={{ width: '50%', justifyContent: 'flex-start' }} key={posts._id}>
                <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "left" }}>{posts?.ownerOfPost?.name}</h5>
                    <img id={posts._id} src={posts.image} className="card-img-top" alt={posts.title} />
                    <div className="card-text" style={{ justifyContent: "space-between" }}>
                        <p style={{ textAlign: "left", fontWeight: "bold", marginBottom: "2%" }}>Liked by  {posts?.usersLikedList?.[0]?.name}   and {posts?.usersLikedList?.length - 1} more</p>
                        <p style={{ textAlign: "left" }}><span style={{ fontWeight: "bold" }}>{posts?.ownerOfPost?.name}</span>:    {posts.description}</p>
                    </div>
                </div>
            </div>
            {posts.map((post) => {
                return (
                    <div className="card" style={{ width: '50%', justifyContent: 'flex-end' }} key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title" style={{ textAlign: "left" }}>COMMENTS</h5>
                            <div className="card-text">
                                <p style={{ textAlign: "left", marginBottom: "2%" }}><span style={{ fontWeight: "bold" }}>{post?.commentsArray?.ownerOfComment}</span>:   {post?.commentsArray?.commentText}</p>
                            </div>
                        </div>
                    </div>
                )
            }
            )}

        </div>
    );
};

export default Post;