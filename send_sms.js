const accountSid = 'AC8d51779e1b2ffff782ba05b0c8265db4';
const authToken = '00142b9ccbafd8ea41cad4428d9d09d0';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
  {
    to: '+16047156043',
    from: '+16042108661',
    body: 'This is the twilio test!!',
  },
  (err, message) => {
    console.log(message.sid);
  }
);