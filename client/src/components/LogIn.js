import React, { useState } from "react";
import { useHistory } from 'react-router-dom'

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const history = useHistory();

  console.log('in Login - user = ')

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
            console.log('user = ', user);
            setUser(user);
            setUsername("");
            setPassword("");
            history.push('/');
          })
      } else { 
            res.json().then(err => setErrors(err))  
      }  
    })  
  }   
console.log('errors = ', errors)

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
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <div>
          <br />
          <br />
          {/* <ul>
            {errors.map((err) => (
                <li key={err}>{err}</li>
            ))}
          </ul> */}
      </div>
    </div>
  );
}

export default Login;

