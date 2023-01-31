import React, { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';

const TransactionAll = () => {
  const { loggedIn, transactions, fetchMyTrans } = useContext(UserContext);
  const history = useHistory();

  if (!loggedIn) {history.push('/')};

  let transList = [];
  if (transactions.length > 0)  {
      transList = [];
  } else {
    fetchMyTrans()
  }

  if (transactions.length > 0) {
      transList = transactions.map((tran) => <h3 key={tran.id}>Date: {tran.updated_at} <span>Ounces: {tran.num_ounces}  -   Price: ${tran.price_per_ounce}  -  Total Cost: ${tran.total_cost}</span></h3>)
  }

  return (
    <div>
       <h1>My Transaction List</h1>
       {transList.length > 0 ? null : <h2>You Currently Have No Transactions</h2> }
       {transList}
       <br />
    </div>  
  )  
}

export default TransactionAll;