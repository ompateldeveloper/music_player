const express = require('express')
const {authMiddleware} = require('../middlewares/authMiddleware')
const { signUp, signIn, getMe } = require('../controllers/authController')
const authRouter = express.Router()
authRouter.get("/v1/auth/signup",(req,res)=>{res.send('/v1/auth/signup')})
authRouter.post("/v1/auth/signup",signUp)
authRouter.post("/v1/auth/signin",signIn)   
authRouter.get("/v1/auth/me",authMiddleware, getMe)   
module.exports = {authRouter};