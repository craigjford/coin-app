class TransactionsController < ApplicationController

    before_action :authorize 

    def index
        #  transactions = current_user.transactions, each_serializer: TransactionAllSerializer
        transactions = current_user.transactions
        render json: transactions, status: :ok
    end

    def create
        transaction = current_user.transactions.create!(transaction_params)
        render json: transaction, status: :created
    end

    def destroy
        transaction = find_transaction
        transaction.destroy
        head :no_content
    end

    def update  
        transaction = find_transaction
        transaction.update!(transaction_params)
        render json: transaction, status: :accepted
    end

    private

    def find_transaction
        current_user.transactions.find(params[:id])
    end

    def current_user  
        User.find_by(id: session[:user_id])
    end

    def transaction_params 
        params.permit(current_user, :dealer_id, :num_ounces, :price_per_ounce)
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
