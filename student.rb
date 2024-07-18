#!/usr/bin/ruby

student = Object.new
$age = 24

def student.talk
  puts "I am a student.\n"
  puts "(I am here)\n"
end

def student.raise(c)
 print("result is: \n", c * 100)
end


def student.time
  #age = 24
  print("I am: \n", $age)
end

def add(a,b)
 puts a + b + $age

end

student.raise(78)
student.talk
student.time
add(90,80)

# we will create an object calculator that performs
# add
# sub
# multiplication
# division
# modulo

calculator = Object.new

def calculator.add(a,b)
  puts"answer is: #{a + b}"
end

def calculator.sub(a,b)
  puts "difference is ", a - b
end

def calculator.multiplication(a,b)
  puts "product is: #{a * b}"

end

calculator.add(900, 100)
calculator.sub(900,100)
calculator.multiplication(900,100)

ticket = Object.new

def ticket.venue
  "Assembly view"
end

def ticket.seat
  "Second Balcony"
end

def ticket.date
  "01/20/2024"
end

def ticket.price
  5.50
end

def ticket.author
  "Mark Twain"
end

def ticket.availability_status
  "sold"
end

def ticket.available?
  false
end


if ticket.available?
  puts "You are lucky"
else
  puts "Sorry--that has been sold"

puts"This ticket is for: #{ticket.date}, at #{ticket.venue}." +
  "The performer is  by  #{ticket.author}." + "The seat is #{ticket.seat}, " + "and its costs $#{"%.2f." % ticket.price}"
end


request = gets.chomp

if ticket.respond_to?(request)
  puts ticket.send(request)
else
  puts "No such information available"
end



orange = Object.new


def orange.price
  10
end

def orange.site
  "Moi avenue"

end

if orange.respond_to?("talk")
  orange.talk
else
  puts "Orange don't talk!"
end


puts "The orange is found in #{orange.site} at a price of #{orange.price} $"

puts "Orange id is: #{orange.object_id}"

message = "Strings of message"
print("Message id is: #{message.object_id}")
#puts Object.new.methods.sort
