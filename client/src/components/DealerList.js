import React from 'react';
import { Link } from 'react-router-dom';

const DealerList = ({ dealer }) => {

    
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
        <br />
        <Link to={`/dealers/${dealer.id}/edit`}>
            <button className="any-btn">Update Dealer</button>
        </Link>
        <Link to={"/transactions/new"}>
            <button className="any-btn">Make Transaction</button>
        </Link>
    </div>
  )
}

export default DealerList;

