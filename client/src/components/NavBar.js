import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = () =>  {
  const { loggedIn, logout } = useContext(UserContext);
  const history = useHistory();

  console.log('in Navbar - user = ', loggedIn)

  const handleLogoutClick = () => {
    fetch("/logout", 
    { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        logout();
        history.push('/');
      }
    });
  }

  return (
    <header>
      <div>
        {loggedIn ? (
        <>
          <NavLink exact to="/">
              <button>Home</button>
          </NavLink>
          <NavLink exact to="/customers">
              <button>Customers</button>
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
        <hr />
      </div>
    </header>
  );
}

export default NavBar;

