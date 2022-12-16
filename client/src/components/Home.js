import React, { useContext } from 'react';
import { UserContext } from "../context/user";

const Home = () => {
  const { user, loggedIn } = useContext(UserContext);
  
  console.log('in Home - user = ', user);
  console.log('in Home - loggedIn = ', loggedIn);

  if (loggedIn) {
    return <h1>Welcome to Your Home Page, {user.username}!</h1>;
  } else {
    return <h1>Home Page - Please Login or Sign Up</h1>;
  }
}

export default Home;