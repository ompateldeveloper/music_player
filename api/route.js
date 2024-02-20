const express = require('express');
const { musicRouter } = require('./v1/routes/musicRoutes');
const { authRouter } = require('./v1/routes/authRoutes');
const route = express.Router();

route.use('/',musicRouter)
route.use('/',authRouter)
module.exports = {route}