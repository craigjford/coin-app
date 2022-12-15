import React from "react";
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = ({ user, setUser }) =>  {
  const history = useHistory();

  console.log('in Navbar - user = ')

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        setUser(null);
        history.push('/');
      }
    });
  }

  return (
    <header>
      <div>
        {user ? (
        <>
          <NavLink exact to="/">
              <button>Home</button>
          </NavLink>
          <button onClick={handleLogoutClick}>Logout</button>
        </>  
        ) : (
          <>
            <NavLink exact to="/">
              <button>Home</button>
            </NavLink>
            <NavLink to="/login">
              <button>Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button>Signup</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;

