import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import React, { useState, useContext } from 'react';
// import { UserContext } from '../context/user'

const UserSignUpForm = ({ setUser }) => {
  // const { loggedIn, signup } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
        city: city,
        state: state,
        phone: phone,
        url: url
      })
    }) 
    .then(res => {
      if (res.ok) {
          res.json().then(user => {
            setUser(user) 
            initializeFormfields()
            history.push('/')
          })
      } else { 
        res.json().then(err => setErrors(err.errors))  
      }  
    })  
  }  

  const initializeFormfields = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirmation("");
    setCity("");
    setState("");
    setPhone("");
    setUrl("");
  }  

  return (
    <div>
      <h1 className="formheader">Welcome to the Sign Up Form</h1>
      <br />
      <form className="course-form" onSubmit={handleSubmit}>
      <label id="formlabel" htmlFor="username">Username  </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <br />
      <br />  
      <label id="formlabel" htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      <br />
      <br />  
      <label id="formlabel" htmlFor="password_confirmation">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="city">City </label>
        <input
          type="text"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="state">State </label>
        <input
          type="text"
          id="state"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="phone">Phone </label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="url">Image </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      <br />
      <br /> 
      <button type="submit" className="submit-btn">Submit</button>
    </form>
      <div>
        <br />
        <br />
        <ul>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </div>  
  </div>
  )
}

export default UserSignUpForm;