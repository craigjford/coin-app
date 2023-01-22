# README

# The Gold Buyer Application

[Coin App] (https://coin-app-45dv.onrender.com)

## Overview

The application is a repository for users to track their purchases from Gold Dealers.  The application has user authentication so a user is required to Signup with a User supplied userid and password.  The user is required to log in to the site to create any activity.  A User is able to create a new Dealer as well as read, delete and update Transactions associated with a specific dealer.  The database is a repository for registered users to track transactions with numerous dealers.  A user is only able to manage transactions associated with their account.  

## Technologies Used
The front end is written in React and is a single page application.  It utilizes React and React-Dom version 18.2.0.  It also uses React-Router-Dom version 5.3.4 as well as React Context.  React interfaces with Ruby (v2.7.4) on Rails (v6.1.6) with Active Record in communicating with the backend's database for CRUD operations and Validations.  The database is a Postgres database (v1.1). The project utilizes BCrypt (v.3.1.7) for password encryption and password recovery.  Ruby on Rails is configured as being an API so it sends formatted JSON to the front end.

## Application Ports
Each application will run on its own port on `localhost`:

- React: [http://localhost:4000](http://localhost:4000)
- Rails: [http://localhost:3000](http://localhost:3000)

## Project Diagram (/client/src/components/coin.drawio.svg)

## React Components

```console
index.js 
    |_ App
       |_ NavBar
          | (logged out)
          |_ Home
          |_ LogIn
          |_ UserSignUpForm
          |_ (logged in)    
          |_ Home
          |_ MyTransactions
               |_ Dealers
                    |_ DealerList
                        |_ TransactionForm
                        |_ TransactionDelete
                        |_ TransactionUpdate             
          |_ All Dealers    
               |_ AllDealers
                    |_ AllDealerList
                    |_ AllDealerForm     
       
```

## React Component Functions

index.js - Renders the App component.  APP is wrapped by Router which enables navigation through the application in the App and NavBar components.  It is also wrapped by UserProvider which enables Context.  Global State is utilized throughtout the application.

Context(/client/src/context/user.js) - Context provides global state for the following information which allows all components access to the following information.  Global state keeps user, loading, logged in, all dealers and (my)dealers information available.  The user state keeps logged in user in state.  Loading is boolean which is set to true when fetch calls are sent to the backend.  This allows the front end to display "Loading" while the back end is processing.  LoggedIn is boolean that is set to true whan a valid user is logged in.  Components use this field to determine if a component can be shown or processing is sent to the Home component telling user to log in.  AllDealears stores a list of all Dealers that have been added to application.  If a user creates a new dealer, the AllDealers state is kept in sync with the backend.  A user can add a dealer without adding a transaction.  (My)Dealers state is important as it keeps all of logged in user's dealers that have user transactions.  As  transactions are created, deleted and updated, this state is also kept in sync with the backend. 

Context also offers functions that are globally accessible.  They will be described in the components below.  Upon invocation of the application, Context contains processing to see if the user is already logged in (meaning a Session cookie) and automatically displays the Home page with users's info.  Processing in context also contains functions to get the (my)Dealers in state whenever a user is determined to be logged in.

App - is the top-level component of the application.  It is called from index.js.  App renders the NavBar component as well as routes which are accessible based on if a user is logged in.  If there is no one logged in, the Home, LogIn and UserSignupForm routes are available.  If a user is logged in, the Home, Dealers, AllDealers, AllDealerForm, TransactionForm, TransactionDelete and TransactionUpdate routes are available.

## App Routes No User

```console
    <Route exact path="/" component={Home} />
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={UserSignUpForm} />
```

## App Routes With User

```console
    <Route exact path="/" component={Home} />=
    <Route exact path="/dealers" component={Dealers} />
    <Route exact path="/alldealers" component={AllDealers} />
    <Route path="/dealers/new" component={AllDealerForm} />
    <Route exact path="/transactions/new" component={TransactionForm} />
    <Route path="/dealers/:dealer_id/transactions/delete" component={TransactionDelete} />
    <Route path="/dealers/:dealer_id/transactions/edit" component={TransactionUpdate} />
```

NavBar - is called from App and is displayed on each page.  The navigation bar will have options depending if a user is logged in as discussed in App description.  If a user is logged in, NavBar has a Logout link.  Upon clicking the Logout link, the component calls the backend to get rid of Session cookie and then uses the logout function provided by Context. 

Home - if a user is logged in, component renders information related to logged in user.  Otherwise, Home renders a message to log in or sign up.

Login - enables a user to log into application.  There are username and password fields to enter data.  Data entered is validated with the backend to validate if information entered is correct.  If data entered is correct, a session cookie is created with user's id and user is navigated to the Home component, otherwise an error message is provided to user and allowing user to try again.

UserSignUpForm - this component is available to new users.  Users will be asked for profile information as well as a username, password and password confirmation. Upon submittng, process is sent the backend where validations are done (as you can review in User model below).  If username is unique and passwords match, and the rest of the inputted data passes validations, a User instance is written to User table and a Session id is created.

Dealers -  when a logged in user selects "My Transactions" from the Navbar, navigation routes to the Dealers component.  The component uses data fetched from the back end that includes all of logged in user's dealers and transactions as described in Context.  It will only include those transaction associated with logged in user.  The Dealers component processes of all the (my)dealers and displays the DealerList.  The DealerList is described below.  It also contains a single add Transaction button on the bottom. Upon clicking on the Add Transaction button, the application navigates to the Transaction Form component.

DealersList - this component displays each of the individual dealers with their dealer data and transactions associated with that dealer.  Each Dealer also has a Transaction Delete and Transaction Update button.    If the user clicks the Transaction update button, processing is routed to the TransactionUpdate component.  

TransActionForm - the user lands in this component after clicking the Add Transaction button in the Dealers component.  The user needs to select a dealer from the All Dealers list. Upon selection, the user is able to enter the number of ounces and the price per ounce and create this transaction.  Upon backend successful completion, component utilizes a Context provided function to add the transaction and if applicable the new Dealer to state.

TransactionDelete - this component enables users to delete transactions associated to a particular dealer.  The dealer is passed to this component utilizing the useParams function.  A user selects a single transaction to be deleted.  Upon submission, the backend is called to delete the transaction.  Upon successful completion, processing is passed back to the front end where the transaction is taken out of state by a Context supplied function.  If the transaction is the last for a dealer, the dealer will also be deleted from state.

TransactionUpdate - this component enables users to update transactions associated to a particular dealer.  The dealer is passed to this component utilizing the useParams function.  A user selects a single transaction to be updates.  Upon submission, the backend is called to update the transaction.  Upon successful completion, processing is passed back to the front end where the transaction is updated in state by a Context supplied function.  

AllDealers -  when a logged in user selects "All Dealers" from the Navbar, navigation routes to the AllDealers component.  The component uses data fetched from the back end that includes all of the dealers that have been created by all users.  This data is held in state in Context.  The AllDealers component processes all of the dealers and displays the AllDealerList.  It also contains a single add Add Dealer button on the bottom. Upon clicking on the Add Dealer button, the application navigates to the AllDealerForm component.

AllDealersList - this component displays each of the database's dealers and their associated data.   

AllDealerForm - a logged in user is able to enter a new Dealer through this component.  A user enters the required relevant data.  Upon submission, the backend is called to create this dealer instance.  Additionally, validations are done upon submitted data to ensure database integrity.  Upon successful completion, Context provides a function that is called to maintain the All Dealer state.  

## Database1

```console
    Users -< Transactions >- Dealers
```

## Database Schema
```console
ActiveRecord::Schema.define(version: 2023_01_16_212537) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "dealers", force: :cascade do |t|
    t.string "name"
    t.string "sales_rep"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "phone"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "dealer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "num_ounces"
    t.integer "price_per_ounce"
    t.index ["dealer_id"], name: "index_transactions_on_dealer_id"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "city"
    t.string "state"
    t.string "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "address"
    t.string "email"
  end

  add_foreign_key "transactions", "dealers"
  add_foreign_key "transactions", "users"
end
```
## Active Record Models

```console
class User < ApplicationRecord
    has_secure_password
    has_many :transactions
    has_many :dealers, through: :transactions

    validates :username, :password, :phone, :email, presence: true
    validates :username, uniqueness: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}
end


class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :dealer

  validates :num_ounces, :price_per_ounce, numericality: { greater_than: 0 }
end


class Dealer < ApplicationRecord
    has_many :transactions
    has_many :users, through: :transactions

    validates :name, :sales_rep, :phone, :email, presence: true
    validates :phone, length: { is: 10 }
    validates :phone, numericality: { only_integer: true}
end


```
## Rails Routes

```console
Rails.application.routes.draw do

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # for testing
  # get "/users", to: "users#index"

  # this route is used to retrieve dealers with associated transactions to the logged in user  
  get "/mydealers", to: "dealers#myindex"

  resources :dealers, only: [:index, :create] 

  resources :transactions, only: [:index, :create, :destroy, :update]  

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
```












