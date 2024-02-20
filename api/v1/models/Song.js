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
    src:{
        type:String,
        required:true
    },
    cover:{
        type:String,
    },
    lyrics:{
        type:String,
    }
})
module.exports = mongoose.models.Task || mongoose.model("Song",songSchema);