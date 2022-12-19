class DealersController < ApplicationController

    def index         
        dealers = Dealer.all 
        render json: dealers, status: :ok
    end
end
