import React, { useContext } from "react";
import { UserContext } from "./context/user";
import { Switch, Route } from "react-router-dom";
import UserSignUpForm from "./components/UserSignUpForm";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Dealers from "./components/Dealers";
import TransactionForm from "./components/TransactionForm";


function App() {
  const { loggedIn, dealers } = useContext(UserContext);

  console.log('in App loggedIn = ', loggedIn);

  return (
    <>
      <NavBar />
      <main>
        {loggedIn ? (
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/dealers">
                <Dealers dealers={dealers} />
            </Route> 
            <Route path="/dealers/:dealer_id/transactions/new">
              <TransactionForm  /> 
            </Route>   
            <Route path="*">
                <h1>404 - Page Not Found</h1>
                <img src="https://bashooka.com/wp-content/uploads/2012/06/404-error-page-template-1.jpg" alt="Not Found" />
            </Route> 
          </Switch>
          ) : (
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <LogIn />
            </Route>     
            <Route path="/signup">
                <UserSignUpForm />
            </Route>    
            <Route path="*">
                <h1>404 - Page Not Found</h1>
                <img src="https://bashooka.com/wp-content/uploads/2012/06/404-error-page-template-1.jpg" alt="Not Found" />
            </Route>
          </Switch>
        )}  
      </main>
    </>        
  )
}

export default App;
