Rails.application.routes.draw do

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get '/user_by_phone_number/:id', to: "users#user_by_phone_number"

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
