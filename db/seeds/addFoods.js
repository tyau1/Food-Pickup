exports.seed = function(knex, Promise) {
  return knex('foods').del()
    .then(function () {
      return Promise.all([
        knex('foods').insert(
          {
          name:'mage bowl',
          price: '$13'}),
      ]);
    });
};