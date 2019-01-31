// const knexConfig  = require("./knexfile");
// const knex        = require("knex")(knexConfig[ENV]);

// knex.insert({
//   name:'Ebi Ten',
//   phone_number: '1-604-689-9938',
//   address:'388 Robson Street, Vancouver, BC V6B 2B2 2B2'
// })
// .returning('id')
// .into('restaurants')
// .finally(function() {
//   knex.destroy();
// })

exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert(
          {id: 1, 
          name:'Ebi Ten',
          phone_number: '1-604-689-9938',
          address:'388 Robson Street, Vancouver, BC V6B 2B2 2B2'}).then(()=>{
            knex('foods').del()
            .then(function () {
              return Promise.all([
                knex('foods').insert(
                  {
                    name:'mage bowl',
                    price: '$13',
                    restaurant_id: knex.select('id').from('restaurants')
                  }),
              ]);
            });
          })
      ]);
    });
};