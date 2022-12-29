import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

const TransactionDelete = () => {
    const [errors, setErrors] = useState([]);
    const { loggedIn, dealers, deleteTrans } = useContext(UserContext);

    const history = useHistory();
    const params = useParams();

    if (!loggedIn) { history.push('/') };

    const dealerArr = dealers.filter((dealer) => parseInt(dealer.id) === parseInt(params.dealer_id)) 
    const dealer = dealerArr[0];

    let transId;

    const getSelectedTrans = (e) => {
        transId = parseInt(e.target.value);
    }

    let dlrTrans = "";

    if (dealer.transactions.length >  0) {
        dlrTrans = dealer.transactions.map((trans) => {
          return (
            <div key={trans.id}>
                <label>
                    <input type="radio" name="selected-tran" value={trans.id} onChange={getSelectedTrans} />
                         Ounces: {trans.ounces}  - Price: ${trans.price}
                </label> 
                <br /> 
            </div>
          )
        })
    }  

    const handleDeleteTrans = () => {
        console.log('handleDeleteTrans - dealer.id = ', dealer.id);
        console.log('handleDeleteTrans - transId = ', transId);

        fetch(`/transactions/${transId}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.ok) {
              deleteTrans(dealer.id, transId);            
          } else {
             res.json().then(error => setErrors(errors))
          }
        });

    }
    console.log('in Trans Delete5');
      return (
        <div>
          <h1>Delete Transaction</h1>
          <h1><i>{dealer.name}</i></h1>
            <h3>Sales Rep: {dealer.sales_rep}</h3>
            <h3>Phone: {dealer.phone}</h3>
            <h3>Email: {dealer.email}</h3>
            <br />
            <h2><u>Transactions</u></h2>
          <br />
          <div>
            {dlrTrans ?  dlrTrans : <h3>No Transactions Exist</h3>}
          </div> 
          <br />
          <div>
              {errors}
          </div>
          <br />
          <button className="any-btn" type="button" onClick={handleDeleteTrans}>Delete</button> 
        </div>
      )
}

export default TransactionDelete;