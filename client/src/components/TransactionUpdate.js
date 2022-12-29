import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';

const TransactionUpdate = () => {
    const { loggedIn, updateTrans, dealers } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const [transId, setTransId] = useState(0);
    const [ounces, setOunces] = useState("");
    const [price, setPrice] = useState("");

    const history = useHistory();
    const params = useParams();
  
    if (!loggedIn) { history.push('/') };

    const dealerArr = dealers.filter((dealer) => parseInt(dealer.id) === parseInt(params.dealer_id)) 
    const dealer = dealerArr[0];

    console.log('Trans Update = ', dealer);

    const getSelectedTrans = (e) => {
          let tranId = e.target.value;
          let tranArr = dealer.transactions.filter((tran) => { return tran.id === parseInt(tranId)});
          let transObj = tranArr[0];
          setTransId(transObj.id)
          setOunces(transObj.ounces)
          setPrice(transObj.price)
    }

    let dlrTrans = [];

    if (dealer.transactions.length > 0) {
       dlrTrans = dealer.transactions.map((trans) => {
        return (
            <div key={trans.id}>
                <label>
                    <input type="radio" name="selected-tran" value={trans.id} checked={false} onChange={getSelectedTrans} />
                         Ounces: {trans.ounces}  -  Price: ${trans.price}
                </label> 
                <br /> 
            </div>
          )
        })
    }
  
    const handleUpdateTrans = (e) => {
          e.preventDefault();        
          console.log('Update - trans id = ', transId);
          console.log('Update - ounces = ', ounces);
          console.log('Update - price = ', price)  
          fetch(`/transactions/${transId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                ounces: ounces,
                price: price
            }),
            })
            .then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    updateTrans(data)
                    setTransId(0)
                    setOunces("")
                    setPrice("")
                })
            } else {
                res.json().then((errors) => setErrors(errors))
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
                    onChange={(e) => setOunces(e.target.value)}
                    value={ounces}
                    />
                <label id="formlabel" htmlFor="price">Price: </label>
                    <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
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