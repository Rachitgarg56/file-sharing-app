const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const FileModel = require('../models/file');

const uploadDirectoryPath = path.join(__dirname, "..", "files");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, uploadDirectoryPath);
    },
    filename: function (req, file, cb) {
        const fileName = uuidv4() + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const upload = multer({
    storage: storage,
}).single('file');


const uploadFile = async (req,res) => {

    upload(req,res, async (error) => {
        
        if (error) {
            console.log('ERROR WHILE UPLOADING FILE', error);
            return;
        }

        const newFile = new FileModel({
            originalFilename: req.file.originalname,
            newFilename: req.file.filename,
            path: req.file.path,
        })

        const newlyInsertedFile = await newFile.save();
        console.log(req.file);
        console.log('File uploaded successfully!');
        res.json({
            success: true,
            message: 'Upload file API',
            // fileId: newlyInsertedFile._id,
        })
    });

};

const generateDownloadableLink = async (req,res) => {
    res.json({
        success: true,
        message: 'Generate Dynamic Link file API',
    })
};

const downloadFile = async (req,res) => {
    res.json({
        success: true,
        message: 'Download file API',
    })
};

const sendFile = async (req,res) => {
    res.json({
        success: true,
        message: 'Send file API',
    })
};


const fileController = {
    uploadFile,
    generateDownloadableLink,
    downloadFile,
    sendFile
}

module.exports = fileController;
