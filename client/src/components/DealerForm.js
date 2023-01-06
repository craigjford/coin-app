import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const DealerForm = () => {
    const { loggedIn, addDealer } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const history = useHistory();    
    const [formData, setFormData] = useState({
      name: "",
      sales_rep: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    });

    if (!loggedIn) { history.push('/') };

    const handleChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setFormData({...formData, [name]: value}); 
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      fetch ("/dealers", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          sales_rep: formData.sales_rep,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          phone: formData.phone,
          email: formData.email
        })
      })  
      .then(res => {
          if (res.ok) {
              res.json().then(dealerObj => {
                  addDealer(dealerObj)
                  initializeFormfields()
                  history.push('/dealers')
              }) 
          } else {
              res.json().then(err => setErrors(err.errors))
          }
        })
    }

    console.log('in Dealer Form - errors = ', errors);
    
    const initializeFormfields = () => { 
        const clearInput = {
          name: "",
          sales_rep: "",
          address: "",
          city: "",
          state: "",
          phone: "",
          email: ""
        }
        setFormData(clearInput);
    }  
  
  return (
    <>
      <div>
        <h1>Add Dealer</h1>
      </div>
      <div>
          <form onSubmit={handleSubmit}>
            <br />
            <br />   
            <label id="formlabel" htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={formData.name}
              />
            <br />
            <br />
            <label id="formlabel" htmlFor="sales_rep">Sales Rep: </label>
              <input
                type="text"
                id="sales_rep"
                name="sales_rep"
                onChange={(e) => handleChange(e)}
                value={formData.sales_rep}
              />
            <br />
            <br />   
            <label id="formlabel" htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={(e) => handleChange(e)}
                value={formData.address}
              />
            <br />
            <br />   
            <label id="formlabel" htmlFor="city">City: </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={(e) => handleChange(e)}
                value={formData.city}
              />
            <br />
            <br /> 
            <label id="formlabel" htmlFor="state">State: </label>
              <input
                type="text"
                id="state"
                name="state"
                onChange={(e) => handleChange(e)}
                value={formData.state}
              />
            <br />
            <br /> 
            <label id="formlabel" htmlFor="phone">Phone: </label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={(e) => handleChange(e)}
                value={formData.phone}
              />
            <br />
            <br />
            <label id="formlabel" htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={formData.email}
              />
            <br />
            <br /> 
            <button type="submit" className="any-btn">Submit</button>
            <br />
            <br />
            <ul>
                {errors ? errors.map(e => <li key={e}>{e}</li>) : ""}
              </ul>    
          </form>
      </div>
    </>
  )
}

export default DealerForm;