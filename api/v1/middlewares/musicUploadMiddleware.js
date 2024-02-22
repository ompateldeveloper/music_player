const multer =  require('multer');
const fs = require('fs')
const path = require('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const userFolder = path.join('public/uploads/', "user_"+req.user._id.toString());
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder);
        }
        cb(null,userFolder)
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalExtension);
    }
})
const upload = multer({ storage: storage });
module.exports = upload