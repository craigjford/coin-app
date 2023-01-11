import React, { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory, Link } from 'react-router-dom';
import AllDealerList from './AllDealerList'

const AllDealers = () => {
  const { loggedIn, allDealers, fetchAllDealers } = useContext(UserContext);
  const history = useHistory();

  if (!loggedIn) {history.push('/')};

  if (allDealers.length === 0) {
      fetchAllDealers();
  }

  console.log('in allDealer = ', allDealers);

  const allDealerList = allDealers.map((ad) => <AllDealerList key={ad.id} ad={ad} /> );

  return (
    <div>
       <h1>Dealer List</h1>
       {allDealerList.length > 0 ? "" : <h2>There are no Dealers</h2> }
       {allDealerList}
       <br />
       <hr />
       <br />
       <Link to={"dealers/new"}>
             <button className="any-btn">Add Dealer</button>
       </Link>
    </div>  
  )  
}

export default AllDealers;