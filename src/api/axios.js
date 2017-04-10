import axios from 'axios';
const SERVER_PORT = require('../../config.json').SERVER_PORT;

const instance = axios.create({
  baseURL: `http://localhost:${SERVER_PORT}`
});

export default instance;
