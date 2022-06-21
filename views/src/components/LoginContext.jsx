import { createContext, useState } from "react";

const loginContext = createContext();

export function LoginProvider({children}) {
    const [user, setUser] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const info = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        }
        console.log(info)
    
        fetch("/api/posts/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
            .then((response) => response.json())
            .then((data) => setUser(data));
    };

    return (
        <loginContext.Provider value={{ user, handleSubmit }}>
            {children}
        </loginContext.Provider>
    )
}

export default loginContext;