class TransactionsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index   
        transactions = Transaction.all
        render json: transactions, include: :dealer ,status: :ok
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
        transaction = current_user.transactions.find(params[:id])
        transaction.destroy
        head :no_content
    end

    def update  
        transaction = current_user.transactions.find(params[:id])
        transaction.update(transaction_params)
        if transaction.valid?
            render json: transaction, status: :accepted
        else
            render json: { error: "unable_to_update_transaction" }, status: :unprocessable_entity           
        end
    end

    private

    def transaction_params 
        params.permit(current_user, :dealer_id, :ounces, :price)
    end

    def render_not_found_response
        render json: { error: "Transaction not found" }, status: :not_found
    end

    # def current_user  
    #     User.find_by(id: session[:user_id])
    # end

end
