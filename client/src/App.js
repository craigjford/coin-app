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
  const { loggedIn } = useContext(UserContext);

  console.log('in App loggedIn = ', loggedIn);

  return (
    <>
      <main>
        <NavBar />
        {loggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dealers" component={Dealers} />
            <Route path="/dealers/:dealer_id/transactions" component={TransactionForm} />
            <Route path="*">
                <h1>404 - Page Not Found</h1>
                <img src="https://bashooka.com/wp-content/uploads/2012/06/404-error-page-template-1.jpg" alt="Not Found" />
            </Route>  
          </Switch>
             ) : ( 
          <Switch> 
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={UserSignUpForm} />
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
