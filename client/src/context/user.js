import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [dealers, setDealers] = useState([{
        transactions: []
      }])

    useEffect(()=>{
        fetch('/me')
        .then(res => {
            if(res.ok) {
                res.json().then(user => {
                    setUser(user);
                    setLoggedIn(true);
                    fetchDealers();
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
        fetchDealers();
    }
    
    const logout = () => {
        setUser({});
        setLoggedIn(false);
    }

    const fetchDealers = () => {
        console.log('fetchDealers before');
        fetch('/dealers')
            .then(res => res.json())
            .then(data => setDealers(data))

        console.log('fetchDealers after');
    }

    const addTrans = (transObj) => {
        console.log('in addTrans = ', transObj)
        console.log('in addTrans = ', transObj.id)

        const updtDealerList = dealers.map((dlr) => {
            if (dlr.id === transObj.dealer_id) {
                console.log('in map - dlr.id = ', dlr.id)
                dlr.transactions.push(transObj)
                console.log('in map - dlr.ts = ', dlr.transactions)
                return dlr;    
            } else {
                return dlr;
            }
        });  
        setDealers(updtDealerList);
    }

    return (
        <UserContext.Provider value={{ user, loggedIn, signup, login, logout, dealers, addTrans }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
