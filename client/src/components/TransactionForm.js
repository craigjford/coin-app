import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

const TransactionForm = () => {
    const { loggedIn, loading, dealers, allDealers, fetchAllDealers, addTrans } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [dealerId, setDealerId] = useState()
    const [formData, setFormData] = useState({
        num_ounces: 0,
        price_per_ounce: 0
      });
     
    const history = useHistory();

    if (!loggedIn) { history.push('/') };

    if(loading) return <h1>Loading</h1>;

    if (allDealers.length === 0) {
      fetchAllDealers();
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = parseInt(e.target.value);

        if (name === "dealerId") {
            setDealerId(value);
            setErrors([]);
        } else { 

          setFormData({
            ...formData,
            [name]: value
          });  
        }  
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
            dealer_id: parseInt(dealerId),
            num_ounces: parseInt(formData.num_ounces),
            price_per_ounce: parseInt(formData.price_per_ounce)
          })
        })   
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                  addTrans(data)
                  setErrors([])
                  const clearInput = {
                    num_ounces: 0,
                    price_per_ounce: 0
                  }
                  setFormData(clearInput)
              })
            } else {
                res.json().then(errors => {
                  setErrors(errors.error)
                })
            }
        })        
        
    }


    let dealerArr = allDealers.filter((d) => d.id === parseInt(dealerId)) 
    let newDlr = dealerArr[0];
    let selDealerArr = dealers.filter((selD) => selD.id === parseInt(dealerId))
    let selDlr = selDealerArr[0];
    let existTrans;
    if (selDealerArr.length > 0) {
        existTrans = selDlr.transactions.map((tr) => <div key={tr.id}> Ounces: {tr.num_ounces}  - Price: ${tr.price_per_ounce}  -  Total Cost: ${tr.total_cost}</div>)
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
          {dealerId > 0 ? (  
          <div>  
            <h2><i>{newDlr.name}</i></h2>
            <h3>Sales Rep: {newDlr.sales_rep}</h3>
            <h3>Phone: {newDlr.phone}</h3>
            <h3>Email: {newDlr.email}</h3>
            <br />
            <>
              <h2><u>Transactions</u></h2>
              {existTrans.length > 0 ?  existTrans : <h3>No Transactions Exist With This Dealer</h3>}
            </>
            <br />
            <form onSubmit={handleSubmit}>
              <label id="formlabel" htmlFor="num_ounces">Ounces: </label>
                <input
                type="number"
                id="num_ounces"
                name="num_ounces"
                onChange={handleChange}
                value={formData.num_ounces}
                />
              <label id="formlabel" htmlFor="price_per_ounce">Price: </label>
                <input
                type="number"
                id="price_per_ounce"
                name="price_per_ounce"
                onChange={handleChange}
                value={formData.price_per_ounce}
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