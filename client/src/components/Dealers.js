import React, { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory, Link } from 'react-router-dom';
import DealerList from './DealerList'

const Dealers = () => {
  const { loggedIn, dealers } = useContext(UserContext);
  const history = useHistory();

  if (!loggedIn) {history.push('/')};

  console.log('in Dealer = ', dealers);

  const dealerList = dealers.map((dealer) => <DealerList key={dealer.id} dealer={dealer} /> );

  return (
    <div>
       <h1>Dealer List</h1>
       {dealerList.length > 0 ? "" : <h2>You currently have No Transactions</h2> }
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