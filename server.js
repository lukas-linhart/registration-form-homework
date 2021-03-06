const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SERVER_PORT = require('./config.json').SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());


const existingUsers = new Set([
  'john@doe.com',
  'jane@doe.com',
]);

const validAddresses = new Set([
  'Riverview',
  'Lavande',
]);


app.post('/validate', function(req, res) {
  const data = req.body;
  if ('email' in data) {
    let response;
    if (existingUsers.has(data.email)) {
      response = { valid: false, errorMessage: "The username already exists" };
    } else {
      response = { valid: true, errorMessage: "" };
    }
    return res.send(response);
  } else if ('address' in data) {
    let response;
    if (!validAddresses.has(data.address)) {
      response = { valid: false, errorMessage: "Invalid address" };
    } else {
      response = { valid: true, errorMessage: "" };
    }
    return res.send(response);
  } else {
    return res
      .status(400)
      .send({ errorMessage: "Cannot validate that. Sry." });
  }
});


app.post('/register', function(req, res) {
  const data = req.body;
  console.log(data);
  return res.send({ message: "Huge success!!! :trollface:" });
});


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

