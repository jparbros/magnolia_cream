# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :property_value do
    identifing_name "MyString"
    display_name "MyString"
    active ""
    property_id 1
  end
end
