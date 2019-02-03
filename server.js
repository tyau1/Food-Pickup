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

function getFoodId(name){
  return knex.select("*").from("foods")
      .where('name',name)
      .then(function(fooditem){
        return fooditem;
      })
}

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
    for (var key in tempVar.foods) {
      var result = getFoodId(key);
      return result.then((item) => {
        fooditemsData.push({
          food_id: item[0].id,
          order_id: orderid,
          qty: Number(tempVar.foods[key]),
          price: (((Math.round((Number(item[0].price) * Number(tempVar.foods[key]))*100))/100).toString())
          });
          
        }).then(()=>{})
        
     } 
    }).then(()=>{
     
      return knex('foods_and_orders').insert(fooditemsData);
      }).then(()=>{
      res.render("confirmation",{test: tempVar});
    })
    
});

app.get("/confirmation", (req, res) => {
  
  res.render("confirmation");
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
