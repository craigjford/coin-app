class TransactionsController < ApplicationController

    def index   
        transactions = Transaction.all
        render json: transactions, include: :dealer ,status: :ok
    end    

    def create
        byebug
        transaction = current_user.transactions.create(transaction_params)
        if transaction.valid?
            byebug
            render json: transaction, status: :created
        else
            byebug
            render json: { error: "unable_to_create_transaction" }, status: :unprocessable_entity
        end

    end

    private

    def transaction_params 
        params.permit(current_user, :dealer_id, :ounces, :price)
    end

    # def current_user  
    #     User.find_by(id: session[:user_id])
    # end

    # vineyards.to_json(include: :wines)
end
