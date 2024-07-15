#!/usr/bin/env ruby

x = 90
y = 100

puts x+y
#puts y % x
#puts x % y
puts x ** y
puts x * y

puts 5 % 2
puts 3 % 2

#puts "Enter celsius value: "
celsius = 100

farenheit = (celsius * 9  / 5) + 32
puts "The result is: " 
print farenheit, "\n"
puts "."

#print("Enter your first name: ")
#@f_name = gets
#print("Enter second name:")
#@s_name = gets
#print("Your name is: ", @f_name, @s_name)


print("Please enter a celcisu value: ")
celsius = gets
farenheit = (celsius.to_i * 9 / 5) + 32
print("Farenheit equivalent is ")
print farenheit
puts "."


