Rails.application.routes.draw do

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/transactions", to: "transactions#create"

  resources :dealers, only: [:index]
  resources :transactions, only: [:index]

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
