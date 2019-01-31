exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', function (table) {
      table.increments();
      table.string('name');
      table.string('phone_number');
      table.string('address');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('restaurants')
  ])
};
