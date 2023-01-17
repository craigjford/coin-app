
import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const TransactionDelete = () => {
    const [errors, setErrors] = useState([]);
    const { loggedIn, dealers, deleteTrans } = useContext(UserContext);

    const history = useHistory();
    const params = useParams();

    if (!loggedIn) { history.push('/') };

    let dealerArr =  []
    let dealer = {}

    if (dealers.length > 0) {
        dealerArr = dealers.filter((dealer) => parseInt(dealer.id) === parseInt(params.dealer_id)) 
        dealer = dealerArr[0];
    }
    
    let transId = 0;

    const getSelectedTrans = (e) => {
        transId = parseInt(e.target.value);
    }

    let dlrTrans = "";
    
    if (dealerArr.length > 0) {
      if (dealer.transactions.length >  0) {
          dlrTrans = dealer.transactions.map((trans) => {
            return (
              <div key={trans.id}>
                  <label>
                      <input type="radio" name="selected-tran" value={trans.id} onChange={getSelectedTrans} />
                          Ounces: {trans.num_ounces}  -  Price: ${trans.price_per_ounce}   -   Total Cost: ${trans.total_cost}
                  </label> 
                  <br /> 
              </div>
            )
          })
      }  
    }
     
     
    const handleDeleteTrans = () => {
        fetch(`/transactions/${transId}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
              deleteTrans(dealer.id, transId);            
          } else {
             res.json().then(errors => setErrors(errors.error))
          }
        });
    }
      
      return (
        <>
        <main>
        {dealerArr.length > 0 ? (
        <div>
          <h1>Delete Transaction</h1>
          <h1><i>{dealer.name}</i></h1>
            <h3>Sales Rep: {dealer.sales_rep}</h3>
            <h3>Phone: {dealer.phone}</h3>
            <h3>Email: {dealer.email}</h3>
            <br />
            <h2><u>Transactions</u></h2>
          <br />
            {dlrTrans}
          <br />
          <div>
              {errors}
          </div>
          <br />
          <button className="any-btn" type="button" onClick={handleDeleteTrans}>Delete</button> 
        </div>
        ) : (
          <>
            <h2><u>Transactions</u></h2>
            <br />
            <div>
               <h3>No Transactions Exist for This Dealer</h3>
            </div> 
            <br />
          </>
        )
        }
        </main>
      </>
    )  
}

export default TransactionDelete;