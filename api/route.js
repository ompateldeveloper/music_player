const express = require('express');
const { musicRouter } = require('./v1/routes/musicRoutes');
const route = express.Router();

route.use('/',musicRouter)
module.exports = {route}