import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";

const UserSignUpForm = () => {
  const { loggedIn, signup } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
        address: address,
        city: city,
        state: state,
        phone: phone,
        email: email
      })
    }) 
    .then(res => {
      if (res.ok) {
          res.json().then(user => {
            signup(user) 
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
    setAddress("");
    setCity("");
    setState("");
    setPhone("");
    setEmail("");
  }  

  const errorsList = errors.map((err) => <li key={err}>{err}</li>);

  if (loggedIn) {return history.push('/')}

  return (
    <div>
      <h1 className="formheader">Welcome to the Sign Up Form</h1>
      <br />
      <form className="course-form" onSubmit={handleSubmit}>
      <label id="formlabel" htmlFor="username">Username:  </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <br />
      <br />  
      <label id="formlabel" htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      <br />
      <br />  
      <label id="formlabel" htmlFor="password_confirmation">Password Confirmation: </label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="state">State: </label>
        <input
          type="text"
          id="state"
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="phone">Phone: </label>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      <br />
      <br /> 
      <label id="formlabel" htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      <br />
      <br /> 
      <button type="submit" className="submit-btn">Submit</button>
    </form>
      <div>
        <br />
        <br />
        <ul>
          {errorsList}
        </ul>
      </div>  
  </div>
  )
}

export default UserSignUpForm;