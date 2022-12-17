import React, { useContext } from 'react';
import { UserContext } from "../context/user";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);
  
  console.log('in Home - user = ', user);
  console.log('in Home - loggedIn = ', loggedIn);

  if (!loggedIn) {return <h1>Home Page - Please Login or Sign Up</h1>;}
    
  return (
    <div>
        <h1>Welcome to Your Home Page, {user.username}!</h1>
        <br />
        <br />
        <h2>Address:  {user.address}</h2>
        <h2>City:  {user.city}</h2>
        <h2>State: {user.state}</h2>
        <h2>Phone: {user.phone}</h2>
        <h2>Email: {user.email}</h2>  
    </div>
  )
}

export default Home;
