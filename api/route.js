const express = require('express');
const { musicRouter } = require('./v1/routes/musicRoutes');
const { authRouter } = require('./v1/routes/authRoutes');
const { authMiddleware } = require('./v1/middlewares/authMiddleware');
const route = express.Router();

route.use('/v1',musicRouter)
route.use('/v1',authRouter)
module.exports = {route}