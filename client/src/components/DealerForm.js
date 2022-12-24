// import React, { useContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { UserContext } from '../context/user';

// const DealerForm = () => {
//     const { loggedIn } = useContext(UserContext);
//     const history = useHistory();    
//     const [formData, setFormData] = useState([{
//       name: "",
//       sales_rep: "",
//       address: "",
//       city: "",
//       state: "",
//       phone: "",
//       email: "",
//       transactions: []
//     }])

//     if (!loggedIn) { history.push('/') };

//     const handleChange = (e) => {
//       let name = e.target.name;
//       let value = e.target.value;
//       setFormData({...formData, [name]: value}); 
//     }

//     const handleSubmit = (e) => {
//       e.preventDefault();

//     }

//   return (
//     <div>
//       <h1>EditDealerForm</h1>
//     </div>
//   )
// }

// export default DealerForm;