import React, { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory, Link } from 'react-router-dom';
import DealerList from './DealerList'

const Dealers = () => {
  const { user, loggedIn, dealers } = useContext(UserContext);
  const history = useHistory();

  if (!loggedIn) {history.push('/')};

  let userDealerList = [];

  if (dealers.length > 0) {
      userDealerList = dealers.map((userDealer) => {
        const newTransArr = userDealer.transactions.filter((t) => t.user_id === user.id)
        userDealer.transactions = newTransArr
        return userDealer
    })
  }

  let dealerList = [];
 
  if (userDealerList.length > 0) {
     dealerList = userDealerList.map((dealer) => <DealerList key={dealer.id} dealer={dealer} /> );
  } 

  return (
    <div>
       <h1>Dealer List</h1>
       {dealerList.length > 0 ? null : <h2>You currently have No Transactions With Any Dealer</h2> }
       {dealerList}
       <br />
       <hr />
       <br />
       <Link to={`/transactions/new`}>  
          <button className="any-btn">Add Transaction</button>
       </Link>
    </div>  
  )  
}

export default Dealers;