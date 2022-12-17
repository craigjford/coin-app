class SessionsController < ApplicationController  

  # POST '/login'
  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])  
      session[:user_id] = user.id
      render json: user, status: :ok
    else  
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end

  end

  # DELETE '/logout'
    def destroy
        if session[:user_id] == nil
            render json: { error: "User is not logged in" }, status: :unauthoried
        else
            session.delete :user_id
            head :no_content
        end
    end

end
