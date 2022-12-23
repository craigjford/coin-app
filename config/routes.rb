Rails.application.routes.draw do

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # post "/dealers/:dealer_id/transactions", to: "transactions#create"

  resources :dealers, only: [:index] do
    resources :transactions, only: [:index, :create, :destroy, :update]
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }

end
