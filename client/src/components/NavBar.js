import React, { useContext } from "react";
import { UserContext } from "../context/user";
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = () =>  {
  const { loggedIn, logout } = useContext(UserContext);
  const history = useHistory();

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
      <div className="navbar">
        {loggedIn ? (
        <> 
          <NavLink exact to="/">
              <button className="any-btn">Home</button>
          </NavLink>
          <NavLink exact to="/dealers">
              <button className="any-btn">My Dealers</button>
          </NavLink>
          <NavLink exact to="/transactions">
              <button className="any-btn">My Transactions</button>
          </NavLink>
          <NavLink exact to="/alldealers">
              <button className="any-btn">All Dealers</button>
          </NavLink>
          <button className="any-btn" onClick={handleLogoutClick}>Logout</button>
        </>  
        ) : (
          <>
            <NavLink exact to="/">
              <button className="any-btn">Home</button>
            </NavLink>
            <NavLink to="/login">
              <button className="any-btn">Login</button>
            </NavLink>
            <NavLink to="/signup">
              <button className="any-btn">Signup</button>
            </NavLink>
          </>
        )}
        <hr />
      </div>
    </header>
  );
}

export default NavBar;

