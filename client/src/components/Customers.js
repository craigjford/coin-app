import React, { useContext} from 'react';
import { UserContext } from "../context/user";

const Customer = () => {
  const { user, loggedIn } = useContext(UserContext);

    console.log('in Customer - user = ', user)

    if (loggedIn) {
        return <h1>Welcome, {user.username}!</h1>;
    } else {
       return <h1>Please Login or Sign Up - Customer Page</h1>; 
    }
}

export default Customer;