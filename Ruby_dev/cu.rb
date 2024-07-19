#!/usr/bin/ruby

def change_string(str)
  str.replace("New string content!")
  puts str
end

class Ticket
  def event
    puts "Fires"
  end
end

ticket = Ticket.new
puts ticket.event


class Car
  def model
    2016
  end

  def make
    "Aurora"
  end
  def year
    2018
  end
  def methods
    def year
    end
  end
end
mercedes = Car.new
print "Mercedes model #{mercedes.model} made in #{mercedes.year} #{mercedes.methods}"
