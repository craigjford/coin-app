import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const AllDealerList = ({ ad }) => {
  const { loggedIn, } = useContext(UserContext);

  const history = useHistory();

  if (!loggedIn) {history.push('/')};    

  return (
    <div>
        <hr />
        <h2>{ad.name}</h2>
        <h4>Sales Rep: {ad.sales_rep}</h4>
        <h4>Address: {ad.address}</h4>
        <h4>City: {ad.city}</h4>
        <h4>State: {ad.state}</h4>
        <h4>Phone: {ad.phone}</h4>
        <h4>Email: {ad.email}</h4>
        <br />
    </div>
  )
}

export default AllDealerList;