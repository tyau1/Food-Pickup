exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('foods', function (table) {
      table.increments();
      table.string('name');
      table.integer('price');
      table.integer('restaurant_id').references('restaurants.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('foods')
  ])
};
