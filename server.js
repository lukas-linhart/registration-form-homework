const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SERVER_PORT = require('./config.json').SERVER_PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

