const mongoose = require('mongoose');
const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
    },
    album:{
        type:String,
    },
})
module.exports = mongoose.models.Task || mongoose.model("Song",songSchema);