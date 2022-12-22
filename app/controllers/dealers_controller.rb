class DealersController < ApplicationController

    before_action :authorize

    def index    
        dealers = current_user.dealers.distinct
        render json: dealers, include: :transactions, status: :ok
    end

    private

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end
    
end
