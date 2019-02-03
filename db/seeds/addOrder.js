
exports.seed = function(knex, Promise) {
  return knex('orders').del()
    .then(function () {
      return Promise.all([
      knex('orders').insert(
        { 
        phone_number:'1-778-987-4366',
        total_price:'$10.75'})
      ]);
    });
};
