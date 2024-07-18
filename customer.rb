#!/usr/bin/ruby

customer = Object.new

def customer.name
  "Carlos Kim"
end

def customer.home
  "Nairob"
end

def customer.handle
  "Facebook"

end

#print "Information desired:"

#request = gets.chomp

#if customer.respond_to?(*request)
  #puts customer.send(request)
#else
  #puts "No info about that"
#end

def two_or_more(a,b, *c)
  puts "Choice is yours"
  puts "and sure enough I got:"
  p a,b, c
end


def sum(a,b, *c)
  p "enter your numbers:"
  p a, b, c
end

Test = Object.new

def Test.id
  puts 'The id of Test is #{Test.object_id}'