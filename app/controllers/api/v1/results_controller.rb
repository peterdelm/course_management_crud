class Api::V1::ResultsController < ApplicationController
  before_action :set_result, only: %i[show destroy]

  def index
    get_results = Result.all.order(created_at: :desc)
    results = []

    get_results.each do |result|
      result_object = {
        student_name: result.student.first_name + " " + result.student.last_name,
        grade:  result.grade,
        course: result.course.name
      }

      results << result_object

      end

    render json: results
  end

  def create
        result = Result.create!(course: get_course, student: get_student, grade: result_params[:grade])
    if result
      render json: result
    else
      render json: result.errors
    end
  end

  def show
    render json: @result
  end

  def destroy
    @result&destroy
    render json: {message: "Result deleted!"}
  end

  private

  def result_params
    params.permit(:student, :course, :grade)
  end

  def set_result
    @result = Result.find(params[:id])
  end

  def get_student
    @student = Student.find(params[:student])
  end

  def get_course
    @course = Course.find(params[:course])
  end
end
