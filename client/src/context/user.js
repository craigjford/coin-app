import React, { useState, useEffect } from 'react'

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [gotAllDealers, setGotAllDealers] = useState(false);
    const [allDealers, setAllDealers] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [transactions, setTransactions] = useState([]);
 
    useEffect(()=>{
        fetch('/me')
        .then(res => {
            if(res.ok) {
                res.json().then(user => {
                    setUser(user);
                    setLoggedIn(true);
                    fetchDealers();
                })
            } else {
                setLoading(false)
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
        setDealers([]);
    }

    const fetchDealers = (user) => {
        fetch('/mydealers')
            .then(res => res.json())
            .then(data => {
                setDealers(data)
                setLoading(false)
            })    
    }

    const fetchAllDealers = () => {
        fetch('/dealers')
            .then(res => res.json())
            .then(data => {
                setAllDealers(data)
                setLoading(false)
                setGotAllDealers(true)
            })    
    }

    const fetchMyTrans = () => {
        fetch('/transactions')
            .then(res => res.json())
            .then(data => {
                setTransactions(data)
                setLoading(false)

            })    
    }

    const addTrans = (transObj) => {

        let foundDealer = false;
        const updtDealerList = dealers.map((dlr) => {
            if (dlr.id === transObj.dealer_id) {
                foundDealer = true
                dlr.transactions.push(transObj)
                return dlr;    
            } else {
                return dlr;
            }
        }); 

        if (foundDealer) {
            setDealers(updtDealerList);
        } else {
            let newDealerList = allDealers.filter((d) => d.id === transObj.dealer_id);
            let newDealer = newDealerList[0];
            newDealer.transactions = [];
            newDealer.transactions.push(transObj);
            updtDealerList.push(newDealer);
            setDealers(updtDealerList); 
        }

        // added code to keep transactions in state synced with database
        const transUpdatedList = [...transactions, transObj] 
        setTransactions(transUpdatedList)

    }

    const deleteTrans = (dealerId, transId) => {
        
        const updtDealerList = dealers.map((dealer) => { 
          if (dealer.id === dealerId) {
              const newTransArr = dealer.transactions.filter((trans) => trans.id !== parseInt(transId))
              dealer.transactions = newTransArr
              return dealer  
          } else {
              return dealer;
          }
        });
        const dealerWithTrans = updtDealerList.filter((d) => d.transactions.length > 0)
        setDealers(dealerWithTrans);

         // added code to keep transactions in state synced with database
         const transUpdatedList = transactions.filter((t) => t.id !== transId)
         setTransactions(transUpdatedList)
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

        // added code to keep transactions in state synced with database
        const transUpdatedList = transactions.map((t) => {
            if (t.id === transObj.id) {
                return transObj
            } else {
                return t
            }
        })
        setTransactions(transUpdatedList)

      }

    const addDealer = (dealerObj) => {
        const updtDealerList = [...dealers, dealerObj];
        setDealers(updtDealerList)
    }

    const addAllDealer = (dealerObj) => {
        const updtAllDealerList = [...allDealers, dealerObj];
        setAllDealers(updtAllDealerList)
    }

    return (
        <UserContext.Provider value={{ user, setDealers, loading, loggedIn, signup, login, logout, dealers, addDealer, gotAllDealers, allDealers, fetchAllDealers, addAllDealer , addTrans, deleteTrans, updateTrans, transactions, fetchMyTrans }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };
