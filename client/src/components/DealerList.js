import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const DealerList = ({ dealer }) => {
  const { loggedIn } = useContext(UserContext)

  const history = useHistory();

  if (!loggedIn) {history.push('/')};

  const submitTrans = (e) => {
    e.preventDefault();
    console.log('event.target = ', e.target);
  }

  let dealerTransList = [];

  if (dealer.transactions.length > 0) {
      dealerTransList = dealer.transactions.map((tran) => <h3>Ounces: {tran.ounces}  -   Price: ${tran.price}</h3>);
  }    
  
  console.log('dealer id = ', dealer.id);

  return (
    <div>
        <hr />
        <h2>{dealer.name}</h2>
        <h4>Sales Rep: {dealer.sales_rep}</h4>
        <h4>Address: {dealer.address}</h4>
        <h4>City: {dealer.city}</h4>
        <h4>State: {dealer.state}</h4>
        <h4>Phone: {dealer.phone}</h4>
        <h4>Email: {dealer.email}</h4>
        <h2><u>Transactions</u></h2>
        <div>
            {dealerTransList.length === 0 && dealer.name > " " ? <h3>No Transactions Exist</h3> : dealerTransList}
        </div>
        <Link to={`/dealers/${dealer.id}/transactions`}>New Transaction</Link>
        {/* <Link to={"/deal"}>
            <button className="any-btn">New Transactions</button>
        </Link> */}
        {/* <Link to={`/deal`}>New Transaction</Link> */}

        {/* <Link to={`/dealers/${dealer.id}/edit`}>
            <button className="any-btn" onClick={submitTrans}>Update Transactions</button>
        </Link> */}
        <Link to={"/transactions/new"}>
            <button className="any-btn" onClick={submitTrans}>Delete Transactions</button>
        </Link>
        <br />
    </div>
  )
}

export default DealerList;

