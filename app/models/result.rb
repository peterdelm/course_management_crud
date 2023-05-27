class Result < ApplicationRecord
  validates :grade, presence: true
  belongs_to :student
  belongs_to :course
end
