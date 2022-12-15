class UsersController < ApplicationController
    # before_action :authorize

    # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index               
        current_user
    end

    def show    
        if session[:user_id] == nil
            render json: { errors: "User Session does not exist" }, status: :unauthorized
        else
            user = User.find_by(id: session[:user_id])
            if user
                render json: user, status: :ok
            else
                render json: { errors: "User Session does not exist" }, status: :unauthorized
            end        
        end    
    end

    def create  
        byebug
        user = User.create(user_params)
        if user.valid?
            byebug
            session[:user_id] = user.id
            render json: user, status: :created
        else
            byebug
            render json: { error: "Invalid User Record Complete"}, status: :unprocessable_entity   
        end

    end

    private

    def current_user  
        User.find_by(id: session[:user_id])
    end

    def user_params              
        params.permit(:username, :password, :password_confirmation, :city, :state, :phone, :url)
    end

    # def authorize   
    #     return render json: { error: "User not authorized" }, status: :unauthorized unless session.include?(:user_id)
    # end

    # def render_not_found(error)
    #     render json: { error: "#{error.model} not found" }, status: :not_found
    # end

    def render_unprocessable_entity(invalid) 
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
