import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const TransactionUpdate = () => {
    const { loggedIn, dealers, updateTrans } = useContext(UserContext);
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
  
      let transId;
      let dlrTrans = "";

      const getSelectedTrans = (e) => {
          transId = e.target.value;
          let tranArr = dealer.transactions.filter((trans) => { return trans.id === parseInt(transId)});
          let formData = tranArr[0];
          setFormData(formData);
      }

      if (dealer.transactions.length > 0) {
        dlrTrans = dealer.transactions.map((trans) => {
          return (
            <div>
                <label key={trans.id}>
                    <input type="radio" name="selected-tran" value={trans.id} checked={false} onChange={getSelectedTrans} />
                         Ounces: {trans.ounces}  -  Price: ${trans.price}
                </label> 
                <br /> 
            </div>
          )
        })
    }
   
      const handleChange = (event) => {
          const name = event.target.name;
          let value = event.target.value;
          setFormData({
            ...formData,
            [name]: value,
          });
      }
  
      const handleUpdateTrans = (e) => {
          e.preventDefault();        

        fetch(`/dealers/${formData.dealer_id}/transactions/${formData.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                ounces: formData.ounces,
                price: formData.price
            }),
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => updateTrans(data))
            } else {
                res.json().then((errors) => setErrors(errors))
            }      
        });

          const clearInput = {
              ounces: "",
              price: ""
          }      
          setFormData(clearInput);    
      }


      return (
        <div>
            <h1 className="formheader">Please Update A Transaction for</h1>
            <h1><i>{dealer.name}</i></h1>
            <h3>Sales Rep: {dealer.sales_rep}</h3>
            <h3>Phone: {dealer.phone}</h3>
            <h3>Email: {dealer.email}</h3>
            <br />
            <h2><u>Transactions</u></h2>
            <form onSubmit={handleUpdateTrans}>
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
                <button type="submit" className="any-btn">Submit</button>
                <br />
                <br />
                <ul>
                    {errors ? errors.map((e) => (<li key={e}>{e}</li>)) : null}
                </ul>
            </form>
            <br />
            <div>
                {dlrTrans ?  dlrTrans : <h3>No Transactions Exist</h3>}
            </div>
        </div>
      )
}

export default TransactionUpdate