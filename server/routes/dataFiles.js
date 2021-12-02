const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const File = require('../model/fileSchema');
const User = require('../model/userSchema');

// Store images in folder
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')
    },
    filename: (req, file, callBack) => {
        callBack(null, `picShare_${file.originalname}`)
    }
})

var upload = multer({ storage: storage})

// Uploading Images----------------------------------------------------------------------

router.post('/uploadFile', upload.single('image'), async (req, res, next)=>{
    const file = req.file;
    if(!file){
        res.send('File not recieved');
    }
    const dbfile = new File({
        filename: file.filename,
        path: `http://localhost:3000/images/${file.filename}`,
        size: file.size
    })

    const respond = await dbfile.save();
    res.send(true);
})

//Fetching Images----------------------------------------------------------------------------------

router.route('/getImages').get( async (req, res)=>{
    try {
        const getFile = await File.find();
        
        if(!getFile){
            res.send('Files not found');
        }

        // console.log(getFile)
        res.json(getFile);


    } catch (err) {
        console.error(err);
    }
});

// Download Images---------------------------------------------------------

router.route('/:id').get( async (req, res)=>{
    const id = req.params.id;
    try {
        console.log(id);
        const fileData = await File.findById(id);
        // console.log(fileData)
        const fileName = fileData.filename
        const filePath = `${__dirname}/../images/${fileName}`;
        // console.log(filePath);
        res.download(filePath, fileName, function (err){
            if(err){
                console.log(err);
            }
        });
    } catch (err) {
        console.log('Error aa rhi hai');
    }
})

module.exports = router;