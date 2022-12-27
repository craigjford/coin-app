import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
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
        fetch('/dealers')
            .then(res => res.json())
            .then(data => {
                setDealers(data)
                setLoading(false)
            })    
    }

    const addTrans = (transObj) => {
        const updtDealerList = dealers.map((dlr) => {
            if (dlr.id === transObj.dealer_id) {
                dlr.transactions.push(transObj)
                return dlr;    
            } else {
                return dlr;
            }
        });  
        setDealers(updtDealerList);
    }

    const deleteTrans = (dealerId, transId) => {

        const updtDealerList = dealers.map((dealer) => {
          if (dealer.id === dealerId) {
              const newTransArr = dealer.transactions.filter((trans) => trans.id !== parseInt(transId))
              dealer.transactions = newTransArr;
              return dealer;
          } else {
              return dealer;
          }
        });
        setDealers(updtDealerList); 
    
    }

    const updateTrans = (transObj) => {

        const updtDealerList = dealers.map((dealer) => {
          if (dealer.id === transObj.dealer_id) {
            const newTransArr = dealer.transactions.map((tran) => {
              if (tran.id === transObj.id) {
                return transObj;
              } else {
                return tran;
              }
            })  
            dealer.transactions = newTransArr;
            return dealer;
          } else {
            return dealer;
          }
        });
        setDealers(updtDealerList); 
      }

    const addDealer = (dealerObj) => {
        dealerObj.transactions = []; 
        const updtDealerList = [...dealers, dealerObj];
        setDealers(updtDealerList)
    }

    return (
        <UserContext.Provider value={{ user, loading, loggedIn, signup, login, logout, dealers, addTrans, deleteTrans, updateTrans, addDealer }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
