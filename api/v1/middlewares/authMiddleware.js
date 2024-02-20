const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    let user = await User.findOne({ _id:id })
    req.user = user
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = {authMiddleware}