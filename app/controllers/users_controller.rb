class UsersController < ApplicationController
  def index
    # params[:keyword]に値が入っていればそのまま処理は続けられ、空だった場合は終了※returnの後ろに条件を記載
    return nil if params[:keyword] == "" 
    # whereメソッドを使用し、入力された値を含むかつ、ログインしているユーザーのidは除外するという条件
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
