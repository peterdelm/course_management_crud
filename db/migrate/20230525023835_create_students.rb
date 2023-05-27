class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :first_name, null: false, limit: 50
      t.string :last_name, null: false, limit: 50
      t.string :date_of_birth, null: false
      t.string :email, null: false, limit: 50

      t.timestamps
    end
  end
end
