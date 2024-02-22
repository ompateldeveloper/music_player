const express = require('express');
const mongoose = require('mongoose')
const prisma = require('prisma');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
const { route } = require('./api/route');

const PORT = process.env.PORT;




app.use('/api/',route);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/assets/:userid/:filename', (req, res) => {
    try {
        const {filename,userid} = req.params
        res.sendFile(path.join(__dirname, 'public','uploads',userid,filename));
        
    } catch (error) {
        console.error(error);
    }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });


mongoose.connect(process.env.MONGO_URI ||'')
.then(()=>{
    app.listen(PORT || 4000,()=>{
        console.log('http://localhost:'+PORT);
    })
})

.catch(err=>console.error(err))