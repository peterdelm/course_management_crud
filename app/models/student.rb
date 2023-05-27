class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
      record.errors.add attribute, ("Please use a valid email address")
    end
  end
end

class DateOfBirthValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    begin
    Date.parse(value)
  rescue ArgumentError
      record.errors.add attribute, ("Please use a valid date")
  end
  end
end

class MinimumAgeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    unless
    value < 10.years.ago
      record.errors.add attribute, ("The student must be older than 10")
    end
  end
end

class Student < ApplicationRecord
    has_many :results, dependent: :destroy
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :date_of_birth, presence: true, date_of_birth: true, minimum_age: true
    validates :email, presence: true, email: true
end
