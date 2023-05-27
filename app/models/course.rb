class Course < ApplicationRecord
    has_many :results, dependent: :destroy
    validates :name, presence: true
end
