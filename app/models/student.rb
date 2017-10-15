class Student < ActiveRecord::Base
  has_many :enrolls
  has_many :courses, :through => :enrolls

  validates :name, :email, :presence => true
end
