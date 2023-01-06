Rails.application.routes.draw do

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # for testing
  get "/users", to: "users#index"

  resources :dealers, only: [:index, :create] 

  resources :transactions, only: [:index, :create, :destroy, :update]  

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
