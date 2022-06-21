import { createContext, useState, useEffect } from "react";

const postContext = createContext();

export function PostProvider({children}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    const replacePost = (original) => {
        const pos = posts.findIndex((post) => post._id === original._id);

        setPosts([
            ...posts.slice(0, pos),
            original,
            ...posts.slice(pos + 1),
        ]);
    };

    const handleLike = (id) => {
        fetch(`/api/posts/${id}`, { method: "PUT" })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                replacePost(data)
            });
    };
    return (
        <postContext.Provider value={{posts, handleLike}}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;