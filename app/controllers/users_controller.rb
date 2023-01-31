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

    def user_by_phone_number

        #  Tom, I know this is a bit hockey, but I struggled to find a cleaner way to see if a string is numeric
        
        input = params[:id]
        input_length = input.length

        compare_arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] 
        i = 0
        is_integer = true

        while (i < input.length && is_integer == true)
            if compare_arr.include? input[i]
                is_integer = true
            else
                is_integer = false
            end 
            i = i + 1        
        end

        if is_integer
            users = User.where("phone LIKE ?", "#{input}%") 
            render json: users, include: :transactions,  status: :ok
        else     
            render json: {error: "Input is required to be numeric" }, status: :bad_request    
        end

    end

    private

    def user_params              
        params.permit(:username, :password, :password_confirmation, :city, :state, :phone, :address, :email)
    end


end

