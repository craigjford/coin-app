import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import UserSignUpForm from "./components/UserSignUpForm";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Customers from "./components/Customers";

function App() {
  const [user, setUser] = useState(null);

  console.log('in App - user = ');

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  console.log('user = ', user);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route exact path="/">
              <Home user={user}/>
            </Route>
            <Route path="/customers">
              <Customers user={user} />
            </Route>   
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <UserSignUpForm setUser={setUser} />
            </Route>
            <Route path="/login">
              <LogIn setUser={setUser} />
            </Route>         
            <Route path="*">
              <h1>404 - Page Not Found</h1>
            </Route>
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;





























// // import { useContext } from "react";
// import { useState, useEffect } from "react"
// import { Switch, Route, useHistory } from "react-router-dom";
// // import { UserContext } from "./context/user";
// import './App.css';
// import LogIn from "./components/LogIn";
// import UserSignUpForm from "./components/UserSignUpForm";
// import NavBar from "./components/NavBar";
// import Home from "./components/Home";


// function App() {
//   // const { user } = useContext(UserContext);
//   const [user, setUser] = useState(null);
//   const [errors, setErrors] = useState(null);
//   // const history = useHistory();

//   console.log('in App - user = ')

//   useEffect(() => {
//     fetch("/me")
//     .then(res => {
//         if(res.ok){
//             res.json().then(user => {
//                 setUser(user)
//             })
//         } else {
//             res.json().then(data => setErrors(data.errors))
//         }
//     })
// },[])

// // console.log('user = ', user)
// // console.log('Errors = ', errors);

//   // if (!user) return <LogIn />;
//   // if (!user) return history.push('/login');

//   // const [count, setCount] = useState(0);

//   // useEffect(() => {
//   //   fetch("/hello")
//   //     .then((r) => r.json())
//   //     .then((data) => setCount(data.count));
//   // }, []);

//   return (
//       <div className="App">
//         <NavBar />
//         <main>
//           {user ? (
//               <Switch>
//                 <Route path="/">
//                   <Home user={user}/>
//                 </Route>  
//               </Switch>
//           ) : (  
//           <Switch>
//             <Route path="/signup">
//               <UserSignUpForm />
//             </Route>  
//             <Route path="/login">
//               <LogIn />
//             </Route>  
//             <Route path="/">
//               <Home />
//             </Route>  
//           </Switch>
//           )}
//         </main>
//       </div>
//   );
// }

// export default App;
