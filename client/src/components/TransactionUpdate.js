import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';

const TransactionUpdate = () => {
    const { loggedIn, updateTrans, dealers } = useContext(UserContext);
    const [errors, setErrors] = useState([]);   
    const [transId, setTransId] = useState(0);
    const [numOunces, setNumOunces] = useState("");
    const [pricePerOunce, setPricePerOunce] = useState("");

    const history = useHistory();
    const params = useParams();
  
    if (!loggedIn) { history.push('/') };

    const dealerArr = dealers.filter((dealer) => parseInt(dealer.id) === parseInt(params.dealer_id)) 
    const dealer = dealerArr[0];

    const getSelectedTrans = (e) => {
   
          if (errors.length > 0) {
              setErrors([])
          }
 
          let tranId = e.target.value; 
          let tranArr = dealer.transactions.filter((tran) => { return tran.id === parseInt(tranId)});
          let transObj = tranArr[0];
          setTransId(parseInt(transObj.id)); 
          setNumOunces(parseInt(transObj.num_ounces));
          setPricePerOunce(parseInt(transObj.price_per_ounce)); 
    }

    let dlrTrans = [];

    if (dealer.transactions.length > 0) {  
       dlrTrans = dealer.transactions.map((trans) => {
        return (
            <div key={trans.id}>
              {transId > 0 ? (
                <>
                  <label>
                    <input type="radio" name="selected-tran" value={trans.id} onChange={getSelectedTrans} />
                        Ounces: {trans.num_ounces}  -  Price: ${trans.price_per_ounce}  -  Total Cost: ${trans.total_cost}
                  </label>
                  <br />
                </>  
            ) : (
               <> 
                <label>
                    <input type="radio" name="selected-tran" value={trans.id} checked={false} onChange={getSelectedTrans} />
                        Ounces: {trans.num_ounces}  -  Price: ${trans.price_per_ounce}  -  Total Cost: ${trans.total_cost}
                </label>
                <br />
              </>
          )}
          </div> 
        )
      })  
    }
  
    const handleUpdateTrans = (e) => {
          e.preventDefault();  

          fetch(`/transactions/${transId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                num_ounces: numOunces,
                price_per_ounce: pricePerOunce
            }),
            })
            .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    updateTrans(data)
                    setTransId(0)
                    setNumOunces("")
                    setPricePerOunce("")
                    setErrors([])
                })
            } else {
                res.json().then((errors) => { 
                    setErrors(errors.errors)
                })
            }      
            });
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
                    onChange={(e) => setNumOunces(e.target.value)}
                    value={numOunces}
                    />
                <label id="formlabel" htmlFor="price">Price: </label>
                    <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => setPricePerOunce(e.target.value)}
                    value={pricePerOunce}
                    />
                <br />
                <br /> 
                { transId > 0 ? (
                        <button type="submit" className="any-btn">Submit</button>
                    ) : (
                        null
                    )
                } 
                <br />
                <br />
            </form>
            <br />
            <div>
                {dlrTrans ?  dlrTrans : <h3>No Transactions Exist For This Dealer</h3>}
            </div>
            <br />
            <ul>
                {errors.length > 0 ? errors.map((e) => (<li style={{color:'red'}} key={e}>{e}</li>)) : null}
            </ul>
        </div>
      )
}

export default TransactionUpdate;
