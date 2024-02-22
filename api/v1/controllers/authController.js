const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../models/User');
const validator = require('validator');
const { Option } = require('lucide-react');
function generateToken (user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey);
};

function sanitizeUser (user) {
    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.password;
    delete sanitizedUser.__v;
    // delete sanitizedUser._id;
    return sanitizedUser;
};
function validate(body,res){

}

const signUp = async (req, res) => {

    try {
        
        if (!req.body.email) {
            return res.status(409).json({error:"please enter email"});
        } else {
            if (!validator.isEmail(req.body.email)) {
                return res.status(409).json({error:"email is not valid"});
            } 
        }
        if(!req.body.password){
            return res.status(409).json({error:"please enter password"});
        } else {
            if (!validator.isStrongPassword(req.body.password,{minUppercase:0})) {
                return res.status(400).json({error:"password is not strong"});
            }
        }

        const exists = await User.findOne({ email: req.body.email });
        if (exists) {
            return res.status(403).json({error:'ALREADY_EXISTS'});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        const sanitizedUser = sanitizeUser(newUser);
        const token = generateToken(newUser);
    
        const payload = {
            meta:{
                access_token:token
            },
            data:sanitizedUser
        } 

        res.status(201).json(payload);
    } catch (error) {
        res.status(400).json(error)
    }
}


const signIn = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(409).json({error:"please enter email"});
        } else {
            if (!validator.isEmail(req.body.email)) {
                return res.status(409).json({error:"email is not valid"});
            } 
        }
        if(!req.body.password){
            return res.status(409).json({error:"please enter password"});
        } else {
            if (!validator.isStrongPassword(req.body.password,{minUppercase:0})) {
                return res.status(400).json({error:"password is not strong"});
            }
        }
        
        console.log('haloo');
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json('Invalid email or password');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json('Invalid email or password.');
        }
        const sanitizedUser = sanitizeUser(user);
        const token = generateToken(user);

        const payload = {
            meta:{
                access_token:token
            },
            data:sanitizedUser
        } 
        res.status(200).json(payload);
    } catch (error) {
        res.status(401).json(error);
    }
}




const getMe = async(req,res)=>{
    try {
        const user = sanitizeUser(req.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(409).json(error);
    }
}


module.exports = {signUp,signIn,getMe};