import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { loggedIn, login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();

  console.log('in Login - loggedIn = ', loggedIn);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }) 
    .then(res => {
      if (res.ok) {
          res.json().then(user => {
            login(user);
            setUsername("");
            setPassword("");
            history.push('/');
          })
      } else { 
          res.json().then(err => {
            console.log('errors = ', err.error)
            setErrors(err.error)
         })  
      }  
    })  
  }   
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username:   </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:   </label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit" className="any-btn">Submit</button>
      </form>
      <div>
          <br />
          <br />
          <div>
              {errors ? <h2>{errors}</h2> : null}
          </div>
      </div>
    </div>
  );
}

export default Login;

