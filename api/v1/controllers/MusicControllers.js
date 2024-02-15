const Song = require('../models/Song')
getAll = async(req,res)=>{
    try {
        const allSongs = await Song.find();
        res.json(allSongs)
    } catch (error) {
        res.status(404).json(error)
    }
}
getOne = async(req,res)=>{
    try {
        const id = req.params.id 
        const oneSong = await Song.findOne(id);
        res.json(allSongs)
    } catch (error) {
        res.status(404).json(error)
    }
}
addOne = async(req,res)=>{
    try {
        const body = req.body
        const createdSong = await Song.create(body);
        console.log(createdSong);
        res.json(createdSong)
    } catch (error) {
        res.status(404).json(error)
    }
}
deleteOne = async(req,res)=>{
    try {
        const id = req.params.id 
        const deleteMsg = await Song.findByIdAndDelete(id);
        console.log(deleteMsg);
        res.json(deleteMsg)
    } catch (error) {
        res.status(404).json(error)
    }
}
editOne = async(req,res)=>{
    try {
        const body = req.body
        const updatedSong = await Song.findByIdAndUpdate(body._id, body, {
            new: true,
        });
        console.log(updatedSong);
        res.json(updatedSong)
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports ={getAll,getOne,addOne,deleteOne,editOne}