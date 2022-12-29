class TransactionsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    before_action :authorize

    def index   
        transactions = Transaction.all
        render json: transactions, include: :dealer, status: :ok
    end    

    def create
        transaction = current_user.transactions.create(transaction_params)
        if transaction.valid?
            render json: transaction, status: :created
        else
            render json: { error: "unable_to_create_transaction" }, status: :unprocessable_entity
        end
    end

    def destroy
        transaction = find_transaction
        transaction.destroy
        head :no_content
    end

    def update  
        transaction = find_transaction
        transaction.update(transaction_params)
        if transaction.valid?
            render json: transaction, status: :accepted
        else
            render json: { error: "unable_to_update_transaction" }, status: :unprocessable_entity           
        end
    end

    private

    def find_transaction
        current_user.transactions.find(params[:id])
    end

    def transaction_params 
        params.permit(current_user, :dealer_id, :ounces, :price)
    end

    def render_not_found_response
        render json: { error: "Transaction not found" }, status: :not_found
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
