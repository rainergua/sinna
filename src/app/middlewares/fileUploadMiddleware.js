const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = '';

    if (req.body.folder) {
      folder = req.body.folder;
    } else {
      folder = 'documentos';
    }

    const destFolder = path.join(__dirname, '..', 'public', folder);
    fs.ensureDirSync(destFolder);

    // Set the destination folder for the uploaded file
    cb(null, destFolder);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB
  },
  fileFilter: (req, file, cb) => {
    // Accept any file type
    cb(null, true);
  }
});

module.exports = upload;
