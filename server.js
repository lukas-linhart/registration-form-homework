const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SERVER_PORT = require('./config.json').SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/validate', function(req, res) {
  const data = req.body;
  console.log("something came in");
  let response = { message: "server is alive and well" };
  return res.send(response);
});


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

