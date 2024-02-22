const Song = require('../models/Song')
const mm = require('music-metadata');
const fs = require('fs')
getAll = async (req, res) => {
    try {
        const allSongs = await Song.find({user:req.user._id});
        console.log('fetched all');
        res.json(allSongs)

    } catch (error) {
        res.status(404).json({endpoint:"getall",error})
    }
}
getAllByArtist = async (req,res) => {
    try {
        const byArtist = await Song.find()
    } catch (error) {
        
    }
}

addOne = async (req, res) => {
    try {
        const body = req.body
        const audioFile = req.file

        if (!audioFile) {
            return res.status(400).json({ error: 'Please upload an audio file' });
        }
        const metadata = await mm.parseFile('public/uploads/' + "user_" + req.user._id.toString() + "/" + audioFile.filename);

        const imageBuffer = metadata.common.picture ? metadata.common.picture[0].data : null;
        if (imageBuffer) {
          const imagePath = 'public/uploads/' + "user_" + req.user._id.toString() +"/"+ audioFile.filename.split('.')[0]+'.jpg';
          fs.writeFileSync(imagePath, imageBuffer);
        }
        const createdSong = await Song.create({
            title: metadata.common.title || 'Unknown Title',
            artist: metadata.common.artist || 'Unknown Artist',
            album: metadata.common.album || 'Unknown Album',
            cover: imageBuffer ? audioFile.filename.split('.')[0]+'.jpg': null,
            lyrics: metadata.common.lyrics?.toString() || "No Lyrics",
            user:req.user._id,
            src: audioFile.filename
        });
        console.log('song added');
        res.json(createdSong)
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}
deleteOne = async (req, res) => {
    try {
        const id = req.params.id
        const deleteMsg = await Song.findByIdAndDelete(id);
        // purging unused resources
        const imagePath = 'public/uploads/' + "user_" + req.user._id.toString() +"/"+ deleteMsg.cover;
        const songPath = 'public/uploads/' + "user_" + req.user._id.toString() +"/"+ deleteMsg.src;
        fs.unlink(imagePath, (err) => {console.log(err,imagePath)});
        fs.unlink(songPath, (err) => {console.log(err,songPath)});
        console.log('deleted');
        res.json(deleteMsg)
    } catch (error) {
        res.status(404).json(error)
    }
}
// editOne = async (req, res) => {
//     try {
//         const body = req.body
//         const updatedSong = await Song.findByIdAndUpdate(body._id, body, {
//             new: true,
//         });
//         console.log(updatedSong);
//         res.json(updatedSong)
//     } catch (error) {
//         res.status(404).json(error)
//     }
// }
module.exports = { getAll, addOne, deleteOne }