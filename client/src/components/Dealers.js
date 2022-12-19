import React, { useContext } from 'react';
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom';
import DealerList from './DealerList'

const Dealers = ({ dealers }) => {
  const { user, loggedIn } = useContext(UserContext);
  const history = useHistory();

console.log('in Dealer = ', user);

  if (!loggedIn) {history.push('/')};

  const dealerList = dealers.map((dealer) => <DealerList key={dealer.id} dealer={dealer}/>)

  return (
    <div>
       <h1>Dealer List</h1>
       {dealerList}
    </div>  
  )  
}

export default Dealers;