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

app.post("/menu", (req, res) => {
  console.log(req.body);
  //orm to delete the record and then firing the insert command.  
  knex('orders').del()
    .then(function () {
      return Promise.all([
        knex('orders')
        .insert([
          {
          phone_number:`${req.body.phone}`,
          food_name_and_amount: 'mega bowl 3',
          total_price:'$10.75'},
          {phone_number:'testing3',
          food_name_and_amount: 'mega bowl 4',
          total_price:'$10.75'}
        ])
      ])})


  res.redirect("/confirmation");
  // const client = require('twilio')(accountSid, authToken);
  // client.messages.create(
  //   {
  //     to: '+16047156043',
  //     from: '+16042108661',
  //     body: 'This is the twilio test!!',
  //   },
  //   (err, message) => {
  //     console.log(message.sid);
  //     res.redirect("/confirmation");
  //   }
  // )
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
