
exports.seed = function(knex, Promise) {
  return knex('restaurants').del()
    .then(function () {
      return Promise.all([
        knex('restaurants').insert(
          {id: 1, 
          name:'Ebi Ten',
          phone_number: '1-604-689-9938',
          address:'388 Robson Street, Vancouver, BC V6B 2B2 2B2'})
          .then(()=>{
            knex('foods').del()
            .then(()=> {
              return Promise.all([
                knex('foods')
                .insert([
                  {
                    name:'mage bowl',
                    price: 13,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'test1',
                    price: 12,
                    restaurant_id: knex.select('id').from('restaurants')
                  }
                ])
              ]);
            });
          })
      ]);
    });
};