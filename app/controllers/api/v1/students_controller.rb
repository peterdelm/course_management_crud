class Api::V1::StudentsController < ApplicationController
  before_action :set_student, only: %i[show destroy]

  def index
    student = Student.all.order(created_at: :desc)
    render json: student
  end

  def create
        student = Student.new(student_params)
    if student.save
      render json: student
    else
      render json: student.errors
    end
  end

  def show
    render json: @student
  end

  def destroy
    student = set_student
    student.destroy
    render json: {message: "Student deleted!"}
  end

  private

  def student_params
    params.permit(:first_name, :last_name, :date_of_birth, :email)
  end

  def set_student
    @student = Student.find(params["student"]['id'])
  end
end
