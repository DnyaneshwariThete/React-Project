class Inventory
  def initialize
    @items = {}
  end

  def add_item(name, quantity)
    @items[name] = (@items[name] || 0) + quantity
  end

  def remove_item(name, quantity)
    current = @items[name] || 0
    puts "Removing #{quantity} of #{name}"
    puts "Current stock: #{current}"
    # BUG: no check that quantity <= current, so stock can go negative
    @items[name] = current - quantity
    puts "New stock: #{@items[name]}"
  end

  def report
    @items.each do |name, qty|
      puts "#{name}: #{qty}"
    end
  end
end

inventory = Inventory.new
inventory.add_item("Widgets", 10)
inventory.remove_item("Widgets", 15)
inventory.report
