#!/usr/bin/ruby

# This file tests on ruby
# welcome dear user
#
puts "This is the first (master) program file "
load "hello.py"
#require "hello.py"
puts "And back again to the first file"

puts 'Please enter your first name:'
@f_name = gets
puts @f_name.upcase

puts 'Please enter your second name: '
@s_name = gets

puts @s_name.downcase

puts @f_name + @s_name
