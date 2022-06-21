import React, { useState } from 'react';

const Login = () => {
    const [choice, setChoice] = useState('');

    const handleClick = event => setChoice(event.target.value);

    switch (choice){
        case '': {
            return (
                <>
                <button value="login" onClick={handleClick}>LOGIN</button>
                <button value="signup" onClick={handleClick}>SIGN UP</button>
                </>
            );
        }
        case "login": {
            return (
                <>
                <header>Login Here!</header>
                <form>
                    <fieldset>
                        <label htmlFor='username'>Username: </label>
                        <input type="text" id="username" placeholder='Username'/>
                        <label htmlFor='password'>Password: </label>
                        <input type="password" id="password"  placeholder='Password'/>
                        <input type="submit" value="ENTER" />
                    </fieldset>
                </form>
                <a onClick={()=> setChoice("forgot")}>Forgot password</a>
                <br></br>
                <a onClick={()=> setChoice("")}>Return</a>
                </>
            )
        }
        case "signup": {
            return (
                <>
                <header>Join us!</header>
                <form>
                    <fieldset>
                        <label htmlFor='username'>Username: </label>
                        <input type="text" id="username" placeholder='Username'/>
                        <label htmlFor='name'>Name: </label>
                        <input type="text" id="name" placeholder='Name'/>
                        <label htmlFor='password'>Password: </label>
                        <input type="password" id="password"  placeholder='Password'/>
                        <input type="submit" value="ENTER" />
                    </fieldset>
                </form>
                <a onClick={()=> setChoice("")}>Return</a>
                </>
            )
        }
        case "forgot": {
            return (
                <>
                <header>Resetting password</header>
                <form>
                    <fieldset>
                        <label htmlFor='username'>Username: </label>
                        <input type="text" id="username" placeholder='Username'/>
                        <label htmlFor='password'>Password: </label>
                        <input type="password" id="password"  placeholder='Password'/>
                        <input type="submit" value="RESET" />
                    </fieldset>
                </form>
                <a onClick={()=> setChoice("")}>Return</a>
                </>

            )
        }
    }
};

export default Login;