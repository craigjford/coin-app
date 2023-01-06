class TransactionsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    before_action :authorize

    # for testing purposes only
    def index   
        transactions = Transaction.all
        render json: transactions, include: :dealer, status: :ok
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
        params.permit(current_user, :dealer_id, :ounces, :price)
    end

    def render_not_found_response
        render json: { error: "Transaction not found" }, status: :not_found
    end

    def render_unprocessable_entity(invalid)
        return render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize   
        return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    end

end
