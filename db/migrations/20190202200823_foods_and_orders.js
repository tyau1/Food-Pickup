
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods_and_orders', function (table) {
      table.increments();
      table.integer('food_id').references('foods.id');
      table.integer('order_id').references('orders.id');
      table.integer('qty');
      table.string('price');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods_and_orders')
  ])
};
