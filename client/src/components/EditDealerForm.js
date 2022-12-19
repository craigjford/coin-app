import React from 'react'
import { useParams } from 'react-router-dom';

const EditDealerForm = ({ dealers, updateDealer }) => {

    const params = useParams();

    console.log('in update ', params.dealer_id)

  return (
    <div>EditDealerForm</div>
  )
}

export default EditDealerForm;