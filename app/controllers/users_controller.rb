class UsersController < ApplicationController

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
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params              
        params.permit(:username, :password, :password_confirmation, :city, :state, :phone, :address, :email)
    end


end

