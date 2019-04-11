exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('orders', function (table) {
      table.increments();
      table.string('phone_number');
      table.string('total_price');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orders')
  ])
};
