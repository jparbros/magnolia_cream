# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :item_prototye do
    name "MyString"
    description "MyText"
    quote "MyText"
    property_value_ids "MyText"
    type ""
  end
end
