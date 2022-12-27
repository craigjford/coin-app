import React, { useContext} from "react";
import { UserContext } from "./context/user";
import { Switch, Route } from "react-router-dom";
import UserSignUpForm from "./components/UserSignUpForm";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Dealers from "./components/Dealers";
import DealerForm from "./components/DealerForm";
import TransactionForm from "./components/TransactionForm";
import TransactionDelete from "./components/TransactionDelete";
import TransactionUpdate from "./components/TransactionUpdate";


function App() {
  const { loading, loggedIn } = useContext(UserContext);
  

  console.log('in App loggedIn = ', loggedIn);

  if(loading) return <h1>Loading</h1>

  return (
    <>
      <main>
        <NavBar />
        {loggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />=
            <Route exact path="/dealers" component={Dealers} />
            <Route path="/dealers/new" component={DealerForm} />
            <Route exact path="/dealers/:dealer_id/transactions" component={TransactionForm} />
            <Route path="/dealers/:dealer_id/transactions/delete" component={TransactionDelete} />
            <Route path="/dealers/:dealer_id/transactions/edit" component={TransactionUpdate} />
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
