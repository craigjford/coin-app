
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { useParams, useHistory } from 'react-router-dom';

const TransactionForm = () => {
    const { loggedIn, dealers, addTrans } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        ounces: "",
        price: ""
      });
     
    const history = useHistory();
    const params = useParams();

    if (!loggedIn) { history.push('/') };

    const dealerArr = dealers.filter((dealer) => parseInt(dealer.id) === parseInt(params.dealer_id)) 
    const dealer = dealerArr[0];
    let dlrTrans = "";

    if (dealer.transactions.length >  0) {
        dlrTrans = dealer.transactions.map((tran) => <h3 key={tran.id}>Ounces: {tran.ounces}  -  Price: ${tran.price}</h3>)
    }  

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
   
        setFormData({
          ...formData,
          [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        fetch(`/dealers/${params.dealer_id}/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ounces: formData.ounces,
            price: formData.price
          })
        })   
        .then(res => {
            if (res.ok) {
                res.json().then(data => addTrans(data))
            } else {
                res.json().then(errors => setErrors(errors))
            }
        })        
    
        const clearInput = {
          ounces: "",
          price: ""
        }

        setFormData(clearInput);
      }


    return (
      <div> 
            <h1 className="formheader">Please Enter A Transaction for</h1>
            <h1><i>{dealer.name}</i></h1>
            <h3>Sales Rep: {dealer.sales_rep}</h3>
            <h3>Phone: {dealer.phone}</h3>
            <h3>Email: {dealer.email}</h3>
            <br />
            <h2><u>Transactions</u></h2>
        <div>
            {dlrTrans === '' ? <h3>No Transactions Exist</h3> : dlrTrans}
        </div>
        <form onSubmit={handleSubmit}>
            <label id="formlabel" htmlFor="ounces">Ounces: </label>
                <input
                type="text"
                id="ounces"
                name="ounces"
                onChange={handleChange}
                value={formData.ounces}
                />
            <label id="formlabel" htmlFor="price">Price </label>
                <input
                type="text"
                id="price"
                name="price"
                onChange={handleChange}
                value={formData.price}
                />
            <br />
            <br /> 
            <button type="submit" className="submit-btn">Submit</button>
            <br />
            <br />
            <ul>
                {errors ? errors.map((e) => (<li key={e}>{e}</li>)) : null}
            </ul>
        </form>
      </div> 
    )   
}  


export default TransactionForm;