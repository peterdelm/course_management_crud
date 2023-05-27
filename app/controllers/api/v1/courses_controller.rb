class Api::V1::CoursesController < ApplicationController
    before_action :set_course, only: %i[show destroy]


   def index
    course = Course.all.order(created_at: :desc)
    render json: course
  end

  def create
        course = Course.create!(course_params)
    if course
      render json: course
    else
      render json: course.errors
    end
  end

  def show
    render json: @course
  end

  def destroy
    course = set_course
    course.destroy
    render json: {message: "Course deleted!"}
  end

  private

  def course_params
    params.permit(:name)
  end

  def set_course
    @course = Course.find(params['course']['id'])
  end
end
