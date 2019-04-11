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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.post("/confirmation", (req, res) => {
  let tempVar = req.body;

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
    .then(function(rows) {
      if (rows){
        let fooditemsData = [];
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

        return knex('foods_and_orders').insert(fooditemsData);
      }
    })
    }).then(()=>{


      client.messages.create(
        {
          to: '+16047156043',
          from: '+16042432302',
          body: `New order: #${tempVar.id}`,
        },
        (err, message) => {

        }
      )
      client.messages.create(
        {
          to: '+17789874366',
          from: '+16042432302',
          body: `You order #${tempVar.id} has been placed. You will receive the waiting time soon`,
        },
        (err, message) => {

        }
      )
      res.render("confirmation",{test: tempVar});
    })

});

app.get("/confirmation", (req, res) => {

  res.render("confirmation");
});

app.get("/order/:id", (req, res) => {

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
      to: '+17789874366',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 15 minutes!',
    },
    (err, message) => {

    }
  )
  res.redirect("/owner");
});

app.post("/order/30mins", (req, res) => {

  client.messages.create(
    {
      to: '+17789874366',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 30 minutes!',
    },
    (err, message) => {

    }
  )
  res.redirect("/owner");
});

app.post("/order/60mins", (req, res) => {

  client.messages.create(
    {
      to: '+17789874366',
      from: '+16042432302',
      body: 'Your order will be ready for pickup in 60 minutes!',
    },
    (err, message) => {

    }
  )
  res.redirect("/owner");
});

app.post("/order/ready", (req, res) => {

  client.messages.create(
    {
      to: '+17789874366',
      from: '+16042432302',
      body: 'Your order ready to be picked up!',
    },
    (err, message) => {

    }
  )
  res.redirect("/");
});

app.get("/owner", (req, res) => {
  res.render("owner");
})



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
