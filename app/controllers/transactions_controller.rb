class TransactionsController < ApplicationController

    def index   
        transactions = Transaction.all
        render json: transactions, include: :dealer ,status: :ok
    end    

    def create
        transaction = Transaction.create(transaction_params)
        if transaction.valid?
            render json: transaction, status: :created
        else
            render json: { error: "unable_to_create_transaction" }, status: :unprocessable_entity
        end

    end

    private

    def transaction_params 
        params.permit(:user_id, :dealer_id, :ounces, :price)
    end

    # def current_user  
    #     User.find_by(id: session[:user_id])
    # end

    # vineyards.to_json(include: :wines)
end
