# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

clark = Student.create(first_name: "Clark", last_name: "Kent", date_of_birth: "January 1, 1994", email: "super@email.com")
Student.create(first_name: "Barbara", last_name: "Gordon", date_of_birth: "January 4, 1994", email: "bat@email.com")
Student.create(first_name: "Peter", last_name: "Parker", date_of_birth: "April 8, 1994", email: "spider@email.com")
Student.create(first_name: "Betsy", last_name: "Ross", date_of_birth: "May 1, 1995", email: "hulk@email.com")

web = Course.create(name: "Advanced Webslinging")
justice = Course.create(name: "Justice")
gym = Course.create(name: "Gym")
ethics = Course.create(name: "Ethics and Morality")
math = Course.create(name: "Math")

Result.create(grade:'F', course: web, student: clark)
Result.create(grade:'F', course: web, student: clark)
Result.create(grade:'F', course: web, student: clark)
Result.create(grade:'F', course: web, student: clark)
Result.create(grade:'F', course: web, student: clark)