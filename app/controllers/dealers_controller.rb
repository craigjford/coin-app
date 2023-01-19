class DealersController < ApplicationController
    wrap_parameters format: []

    before_action :authorize

    def index  
        dealers = Dealer.all
        render json: dealers, each_serializer: DealerAllSerializer
    end

    # get all dealers and transactions associated logged in user
    def myindex  
        dealers = current_user.dealers.distinct
        render json: dealers, status: :ok
    end

    def create    
        dealer = Dealer.create!(dealer_params)
        render json: dealer, status: :created
    end

    private

    def current_user  
        User.find_by(id: session[:user_id])
    end

    def dealer_params 
        params.permit(:name, :sales_rep, :address, :city, :state, :phone, :email)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

    
end
