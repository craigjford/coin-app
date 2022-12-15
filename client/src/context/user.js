import React, { useState, useEffect } from 'react'

//create the context 
const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    console.log('in UserProvider', user)

    useEffect(() => {
        fetch('/me')
        .then(res => res.json())
        .then(data => {
            setUser(data)
            data.error ? setLoggedIn(false) : setLoggedIn(true)
        })
    }, [])

    const signup = (user) => {
        setUser(user);
        setLoggedIn(true);
    }

    const login = (user) => {
        setUser(user);
        setLoggedIn(true);
    }
    
    const logout = () => {
        setUser({});
        setLoggedIn(false);
    }

    return (
        <UserContext.Provider value={{ user, loggedIn, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

