const express = require('express');
const upload =  require('../middlewares/musicUploadMiddleware.js')
const musicRouter = express.Router();
const musicController = require('../controllers/MusicControllers.js')
musicRouter.get('/v1/music',musicController.getAll);
musicRouter.get('/v1/music/:id',musicController.getOne);
musicRouter.post('/v1/music',upload.single('audio'),musicController.addOne);
musicRouter.put('/v1/music',musicController.editOne);
musicRouter.delete('/v1/music/delete/:id',musicController.deleteOne);
module.exports={musicRouter}