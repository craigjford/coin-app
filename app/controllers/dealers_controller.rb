class DealersController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    before_action :authorize

    def index  
        render json: Dealer.all, status: :ok
    end

    def myindex  
        dealers = current_user.dealers.distinct
        render json: dealers, include: :transactions, status: :ok
    end

    # def create    
    #     dealer = current_user.dealers.create!(dealer_params)
    #     render json: dealer, status: :created
    # end

    def create    
        dealer = Dealer.create!(dealer_params)
        render json: dealer, status: :created
    end

    private

    def dealer_params 
        params.permit(:name, :sales_rep, :address, :city, :state, :phone, :email)
    end

    def current_user  
        User.find_by(id: session[:user_id])
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
    
end
