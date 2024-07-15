#!/usr/bin/ruby

puts "Reading celsius temeperature value from data file.."
num = File.read("temp.dat")
celsius = num.to_i
farenheit = (celsius * 9  / 5) + 32
puts "The number is " + num
print "Result: "
puts farenheit
