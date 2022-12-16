import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        fetch('/me')
        .then(res => {
            if(res.ok) {
                res.json().then(user => {
                    setUser(user);
                    setLoggedIn(true);
                })
            }    
        })
    },[])

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
