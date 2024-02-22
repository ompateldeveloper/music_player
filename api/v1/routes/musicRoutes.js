const express = require('express');
const upload =  require('../middlewares/musicUploadMiddleware.js')
const musicRouter = express.Router();
const musicController = require('../controllers/MusicControllers.js');
const { authMiddleware } = require('../middlewares/authMiddleware.js');
musicRouter.get('/music',authMiddleware,musicController.getAll);
musicRouter.post('/music',authMiddleware,upload.single('audio'),musicController.addOne);
musicRouter.delete('/music/delete/:id',authMiddleware,musicController.deleteOne);
// musicRouter.get('/v1/music/:id',musicController.getOne);
// musicRouter.put('/v1/music',musicController.editOne);
module.exports={musicRouter}