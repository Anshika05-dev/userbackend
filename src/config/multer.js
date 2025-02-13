const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, uploadPath);  // Ensure uploads/ directory is used
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);  // Name the file with a timestamp and original name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // Set a size limit (optional)
    fileFilter: (req, file, cb) => {  // Optionally, restrict file types
        console.log("dece", file);
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});

module.exports = upload;
