exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods', function (table) {
    table.increments();
    table.string('name');
    table.string('price');
    table.integer('restaurant_id').references('restaurants.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods');
};
