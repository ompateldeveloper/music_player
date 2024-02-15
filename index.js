const express = require('express');
const mongoose = require('mongoose')
const prisma = require('prisma');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
const { route } = require('./api/route');

const PORT = process.env.PORT;
app.get('/',(req,res)=>{
    res.send('hello from backend')
})
app.use('/api',route);
mongoose.connect(process.env.MONGO_URI ||'')
.then(()=>{
    app.listen(PORT || 4000,()=>{
    
        console.log('http://localhost:'+PORT);
    })
})
.catch(err=>console.error(err))