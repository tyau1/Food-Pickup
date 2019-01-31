
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
                    name:'SRIRACHA CHICKEN',
                    price: 9.25,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'EBITEN BOWL',
                    price: 9.75,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'MEGA BOWL',
                    price: 10.75,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'TERIYAKI CHICKEN',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'TEMPURA BOWL',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'YAKINIKU BEEF',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'BUTA-MAYO',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'KATSU CURRY',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'PRAWN CURRY',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'TEMPURA UDON',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'BEEF UDON',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'BEEF UDON',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'SPICY PORK UDON',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                  {
                    name:'BEEF YAKI UDON',
                    price: 8.95,
                    restaurant_id: knex.select('id').from('restaurants')
                  },
                ])
              ]);
            });
          })
      ]);
    });
};