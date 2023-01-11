
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

const TransactionForm = () => {
    const { loggedIn, dealers, allDealers, fetchAllDealers, addTrans } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        dealerId: 0,
        ounces: "",
        price: ""
      });
     
    const history = useHistory();

    if (!loggedIn) { history.push('/') };

    if (allDealers.length === 0) {
      fetchAllDealers();
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({
          ...formData,
          [name]: value
        });
    }

    let transDlrs = [];

    if (allDealers.length > 0) {
       transDlrs = allDealers.map((dlr) => {
        return (
            <div key={dlr.id}>
                <label>
                    <input type="radio" name="dealerId" value={dlr.id} onChange={handleChange} />
                         Name: {dlr.name} 
                </label> 
                <br /> 
            </div>
          )
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dealer_id: formData.dealerId,
            ounces: formData.ounces,
            price: formData.price
          })
        })   
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                  addTrans(data)
                  // history.push('/dealers')
              })
            } else {
                res.json().then(errors => setErrors(errors))
            }
        })        
    
        const clearInput = {
          dealerId: 0,
          ounces: "",
          price: ""
        }

        setFormData(clearInput);
      }
   
  
    let dealerArr = allDealers.filter((d) => d.id === parseInt(formData.dealerId)) 
    let newDlr = dealerArr[0];
    let selDealerArr = dealers.filter((selD) => selD.id === parseInt(formData.dealerId))
    let selDlr = selDealerArr[0];
    let existTrans;
    if (selDealerArr.length > 0) {
        existTrans = selDlr.transactions.map((tr) => <div key={tr.id}> Ounces: {tr.ounces}  - Price: ${tr.price}</div>)
    } else {
        existTrans = [];
    }    

    return (
      <div> 
            <h1 className="formheader">Transaction Add</h1>
            <br />
            <h2>Please Select a Dealer</h2>
            <div>
                {transDlrs}
            </div>
          {formData.dealerId > 0 ? (
          <div>  
            <h2><i>{newDlr.name}</i></h2>
            <h3>Sales Rep: {newDlr.sales_rep}</h3>
            <h3>Phone: {newDlr.phone}</h3>
            <h3>Email: {newDlr.email}</h3>
            <br />
            <>
              <h2><u>Transactions</u></h2>
              {existTrans.length > 0 ?  existTrans : <h3>No Transactions Exist</h3>}
            </>
            <br />
            <form onSubmit={handleSubmit}>
              <label id="formlabel" htmlFor="ounces">Ounces: </label>
                <input
                type="text"
                id="ounces"
                name="ounces"
                onChange={handleChange}
                value={formData.ounces}
                />
              <label id="formlabel" htmlFor="price">Price: </label>
                <input
                type="text"
                id="price"
                name="price"
                onChange={handleChange}
                value={formData.price}
                />
            <br />
            <br /> 
            <button type="submit" className="any-btn">Submit Transaction</button>
            <br />
            <br />
          </form>  
          </div>  
            ) :  (<br />)
          }
            <br />
            <ul>
                {errors ? errors.map((e) => (<li key={e}>{e}</li>)) : null}
            </ul>

      </div> 
    )   
}  

export default TransactionForm;