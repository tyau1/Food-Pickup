"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const foodsRoutes = require("./routes/foods");
const accountSid = 'ACb563e253710f1247154c2c5c51ba57bc';
const authToken = 'aff4f2de6cae1ab86287c5c8ab9c3991';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: false,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/foods", foodsRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.post("/order_check", (req, res) => {



});

// function insert(array){
//   return knex("foods_and_")
//       .where('name',name)
//       .then(function(fooditem){
//         return fooditem;
//       })
// }

app.post("/menu", (req, res) => {
  let tempVar=req.body;
  let fooditemsData = [];
  return knex('orders')
  .insert({
        phone_number:`${req.body.phone}`,
        total_price: `${req.body.total_price}`
  }).returning('id')
  .then((id) => {
    
    let orderid = id[0];
    
    tempVar["id"]= orderid;
    let foods_name=[]
    for (let element in tempVar.foods){
      foods_name.push(element);
    }

    knex('foods')
    .select('*')
    .whereIn('name',foods_name)
    .asCallback(function(err, rows) {
      if (err){
        console.log(err);
      }
      if (rows){
        const foodIds = rows.map((element)=>{
          return element.id
        })
        const foodprice = rows.map((element)=>{
          return element.price
        })
        for (let i = 0; i < rows.length; i++){
          fooditemsData.push({
            food_id: foodIds[i],
            order_id: orderid,
            qty: Number(tempVar.foods[foods_name[i]]),
            price: (((Math.round((Number(foodprice[i]) * Number(tempVar.foods[foods_name[i]]))*100))/100).toString())
            });
        }
      }else{
        console.log('error')
      }
    }) 
    }).then(()=>{
      // console.log("after",fooditemsData);
      return knex('foods_and_orders').insert(fooditemsData);
      }).then(()=>{
      res.render("confirmation",{test: tempVar});
    })
    
});

app.get("/confirmation", (req, res) => {
  
  res.render("confirmation");
});

app.get("/order/:id", (req, res) => {
  // console.log(knex.select('*').from('foods_and_orders').where('order_id',req.params.id));
  
  return Promise.all([
    knex('foods_and_orders')
    .where('order_id',req.params.id)
    .then(function(foods_orders) {
      if (!foods_orders) { return false }

      const foodIds = foods_orders.map((element)=> element.food_id)
      return knex.select('name','id').from('foods').whereIn('id', foodIds).then((foods)=> {
        
        return foods.map((food) => {
          const food_order = foods_orders.find(food_order => food_order.food_id === food.id);
          return ({ 
            name: food.name, 
            qty: food_order.qty, 
            price: food_order.price,
            orderId:food_order.order_id
          });
        });
      })
    }).then(function( foods) {
      console.log(foods);
      res.render("order", {foods: foods});
    })
  ]);
});

app.get("/order", (req, res) => {
  res.render("order");
});

app.post("/order/15mins", (req, res) => {

  client.messages.create(
    {
      to: '+16047156043',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 15 minutes!',
    },
    (err, message) => {
      console.log(message.sid);
    }
  )
  res.redirect("/owner");
});

app.post("/order/30mins", (req, res) => {

  client.messages.create(
    {
      to: '+16047156043',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 30 minutes!',
    },
    (err, message) => {
      console.log(message.sid);
    }
  )
  res.redirect("/owner");
});

app.post("/order/60mins", (req, res) => {

  client.messages.create(
    {
      to: '+16047156043',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 60 minutes!',
    },
    (err, message) => {
      console.log(message.sid);
    }
  )
  res.redirect("/owner");
});

app.post("/order/ready", (req, res) => {

  client.messages.create(
    {
      to: '+16047156043',
      from: '+16042432302',
      body: 'Your order ready to be picked up!',
    },
    (err, message) => {
      console.log(message.sid);
    }
  )
  res.redirect("/confirmation");
});

app.get("/owner", (req, res) => {
  res.render("owner");
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
