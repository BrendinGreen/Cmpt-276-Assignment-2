class CreateThings < ActiveRecord::Migration
  def change
    create_table :things do |t|
      t.string :name
      t.text :description
      t.integer :person_id

      t.timestamps null: false
    end
  end
end
